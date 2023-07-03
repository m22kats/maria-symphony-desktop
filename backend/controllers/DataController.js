const storage = require('node-persist');
const {
  MariaResponse,
  MariaDataPageResponse,
} = require('./response/MariaResponse');

const mongoose = require('mongoose');
const url = `mongodb://localhost:${process.env.MONGODB_SERVER_PORT}/Symphony`;
const Entity = require('../schema/entity');

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

exports.getAllEntities = async (req, res) => {
  try {
    const result = await Entity.find();
    res.json(result);
  } catch (err) {
    console.error('Error retrieving data from MongoDB:', err);
    res.status(500).send('Error retrieving data from database');
  }
};

exports.searchEntities = async (req, res) => {
  try {
    const { searchText, code, pageIdx, size } = req.query;

    const query = {
      organization: await storage.getItem('organization'),
      ...(searchText
        ? { rhythmNote: { $regex: `.*${searchText}.*`, $options: 'i' } }
        : {}),
      type: { $in: code.split(',') },
    };

    const result = await Entity.find(query)
      .skip(parseInt(pageIdx) * parseInt(size))
      .limit(parseInt(size));

    // Rename _id to melodyId in each entity
    const modifiedResult = result.map((entity) => {
      const { _id: melodyId, ...rest } = entity.toObject();
      return { melodyId, ...rest };
    });

    const totalItems = await Entity.countDocuments(query);
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

    const newEntity = new Entity({
      _id: melodyId,
      type,
      rhythmNote: melodyId.split('/')[2],
      organization: await storage.getItem('organization'),
      title,
      isActive,
      createTime: currentTime,
      updateTime: currentTime,
      attributes,
    });

    await newEntity.save();

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

    const result = await Entity.deleteMany({ _id: { $in: melodyIds } });

    const response = new MariaResponse();
    response.status.code = 'success';
    response.status.message = `${result.deletedCount} entities deleted successfully`;

    res.json(response);
  } catch (err) {
    console.error('Error deleting entities from MongoDB:', err);

    const response = new MariaResponse();
    response.status.code = 'fail';
    response.status.message = 'Error deleting data from the database';

    res.status(500).send(response);
  }
};
