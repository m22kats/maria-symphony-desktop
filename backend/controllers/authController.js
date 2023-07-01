const { MongoClient } = require('mongodb');

const url = `mongodb://localhost:${process.env.MONGODB_SERVER_PORT}/Symphony`;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const client = await MongoClient.connect(url);
    const db = client.db();
    const collection = db.collection('musicians');

    const user = await collection.findOne({ _id: username, password });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Omit the password from the returned user object
    const { password: userPassword, ...userData } = user;

    // Generate a token
    const token = 'implement later';

    const signInResponse = {
      ...userData,
      token,
    };

    client.close();
    res.json(signInResponse);
  } catch (err) {
    console.error('Error retrieving data from MongoDB:', err);
    res.status(500).send('Error retrieving data from database');
  }
};

exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    const client = await MongoClient.connect(url);
    const db = client.db();
    const collection = db.collection('musicians');

    const existingUser = await collection.findOne({ _id: username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = {
      _id: username,
      password,
    };

    await collection.insertOne(newUser);

    const signUpResponse = {
      username: newUser._id,
    };

    client.close();
    res.status(201).json(signUpResponse);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Failed to create user' });
  }
};
