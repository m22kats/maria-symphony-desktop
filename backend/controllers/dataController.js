const { MongoClient } = require('mongodb');

const url = `mongodb://localhost:${process.env.MONGODB_SERVER_PORT}/Symphony`;

exports.getAllEntities = async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db();
    const collection = db.collection('entities');
    const result = await collection.find({}).toArray();
    client.close();
    res.json(result);
  } catch (err) {
    console.error('Error retrieving data from MongoDB:', err);
    res.status(500).send('Error retrieving data from database');
  }
};

// Search entities based on query parameters
exports.searchEntities = async (req, res) => {
  try {
    const { organization, searchText, code, pageIdx, size } = req.query;

    const client = await MongoClient.connect(url);
    const db = client.db();
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

    client.close();
    res.json(result);
  } catch (err) {
    console.error('Error searching entities in MongoDB:', err);
    res.status(500).send('Error searching entities in database');
  }
};
