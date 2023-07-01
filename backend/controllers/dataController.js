const { MongoClient } = require('mongodb');

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
    const { organization, searchText, code, pageIdx, size } = req.query;

    const db = await connectToDatabase();
    const collection = db.collection('entities');

    const query = {
      organization,
      rhythmNote: { $regex: `.*${searchText}.*`, $options: 'i' },
      type: { $in: code.split(',') },
    };

    const result = await collection
      .find(query)
      .skip(parseInt(pageIdx) * parseInt(size))
      .limit(parseInt(size))
      .toArray();

    res.json(result);
  } catch (err) {
    console.error('Error searching entities in MongoDB:', err);
    res.status(500).send('Error searching entities in database');
  }
};

exports.createEntity = async (req, res) => {
  try {
    const {
      melodyId,
      type,
      rhythmNote,
      organization,
      title,
      isActive,
      attributes,
    } = req.body;

    const currentTime = new Date();

    const client = await MongoClient.connect(url);
    const db = client.db();
    const collection = db.collection('entities');

    const newEntity = {
      _id: melodyId,
      type,
      rhythmNote,
      organization,
      title,
      isActive,
      createTime: currentTime,
      updateTime: currentTime,
      attributes,
    };

    await collection.insertOne(newEntity);

    client.close();
    res.status(201).json(newEntity);
  } catch (err) {
    console.error('Error creating entity:', err);
    res.status(500).json({ message: 'Failed to create entity' });
  }
};

exports.deleteEntities = async (req, res) => {
  try {
    const { melodyIds } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection('entities');

    const result = await collection.deleteMany({ _id: { $in: melodyIds } });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Error deleting entities from MongoDB:', err);
    res.status(500).send('Error deleting entities from database');
  }
};
