const { MongoClient } = require('mongodb');
const {
  MariaResponse,
  MariaDataPageResponse,
} = require('./response/MariaResponse');
const storage = require('../data/app-data.js');

const url = `mongodb://localhost:${process.env.MONGODB_SERVER_PORT}/Symphony`;

const connectToDatabase = async () => {
  const client = await MongoClient.connect(url);
  return client.db();
};

exports.getAllEntities = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('entities');
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (err) {
    console.error('Error retrieving data from MongoDB:', err);
    res.status(500).send('Error retrieving data from database');
  }
};

exports.searchEntities = async (req, res) => {
  try {
    const { searchText, code, pageIdx, size } = req.query;

    const db = await connectToDatabase();
    const collection = db.collection('entities');

    const query = {
      organization: storage.data.organization,
      ...(searchText
        ? { rhythmNote: { $regex: `.*${searchText}.*`, $options: 'i' } }
        : {}),
      type: { $in: code.split(',') },
    };

    const result = await collection
      .find(query)
      .skip(parseInt(pageIdx) * parseInt(size))
      .limit(parseInt(size))
      .toArray();

    // Rename _id to melodyId in each entity
    const modifiedResult = result.map((entity) => {
      const { _id: melodyId, ...rest } = entity;
      return { melodyId, ...rest };
    });

    const totalItems = await collection.countDocuments(query);
    const totalPages = Math.ceil(totalItems / parseInt(size));

    const response = new MariaResponse();
    response.data.items = modifiedResult;
    response.data.page = new MariaDataPageResponse();
    response.data.page.total = totalItems;
    response.data.page.hasNext = parseInt(pageIdx) < totalPages - 1;
    response.data.page.hasPrevious = parseInt(pageIdx) > 0;
    response.data.page.currentPage = parseInt(pageIdx);

    response.status.code = 'success';

    res.json(response);
  } catch (err) {
    console.error('Error searching entities in MongoDB:', err);

    const response = new MariaResponse();
    response.status.code = 'fail';
    response.status.message = 'Error retrieving data from the database';

    res.status(500).json(response);
  }
};

exports.createEntity = async (req, res) => {
  try {
    const { melodyId, type, title, isActive, attributes } = req.body;

    const currentTime = new Date();

    const client = await MongoClient.connect(url);
    const db = client.db();
    const collection = db.collection('entities');

    const newEntity = {
      _id: melodyId,
      type,
      rhythmNote: melodyId.split('/')[2],
      organization: storage.data.organization,
      title,
      isActive,
      createTime: currentTime,
      updateTime: currentTime,
      attributes,
    };

    await collection.insertOne(newEntity);

    client.close();

    const response = new MariaResponse();
    response.status.code = 'success';
    response.status.message = 'New entity successfully created';

    res.status(201).json(response);
  } catch (err) {
    console.error('Error creating entity:', err);

    const response = new MariaResponse();
    response.status.code = 'fail';
    response.status.message = 'Error inserting data into the database';

    res.status(500).json(response);
  }
};

exports.deleteEntities = async (req, res) => {
  try {
    const { melodyIds } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection('entities');

    const result = await collection.deleteMany({ _id: { $in: melodyIds } });

    const response = new MariaResponse();
    response.status.code = 'success';
    response.status.message = `${result.deletedCount} deleted successfully`;

    res.json(response);
  } catch (err) {
    console.error('Error deleting entities from MongoDB:', err);

    const response = new MariaResponse();
    response.status.code = 'fail';
    response.status.message = 'Error deleting data from the database';

    res.status(500).send(response);
  }
};
