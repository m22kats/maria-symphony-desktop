const storage = require('node-persist');
const { MongoClient } = require('mongodb');
const { MariaResponse } = require('./response/MariaResponse');

const url = `mongodb://localhost:${process.env.MONGODB_SERVER_PORT}/Symphony`;

const connectToDatabase = async () => {
  const client = await MongoClient.connect(url);
  return client.db();
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection('musicians');

    const user = await collection.findOne({ _id: username, password });
    if (!user) {
      const response = {
        status: {
          code: 'fail',
          message: 'User not found',
        },
      };
      const mariaResponse = new MariaResponse();
      mariaResponse.status = response.status;
      return res.status(404).json(mariaResponse);
    }

    // Omit the password from the returned user object
    const { password: userPassword, ...userData } = user;
    await storage.setItem('organization', user.organization);

    // Generate a token
    const token = 'implement later';

    const signInResponse = {
      ...userData,
      token,
    };

    const response = {
      data: {
        items: [signInResponse],
      },
      status: {
        code: 'success',
      },
    };

    const mariaResponse = new MariaResponse();
    mariaResponse.data = response.data;
    mariaResponse.status = response.status;

    res.json(mariaResponse);
  } catch (err) {
    console.error('Error retrieving data from MongoDB:', err);
    const response = {
      status: {
        code: 'fail',
        message: 'Error retrieving data from database',
      },
    };
    const mariaResponse = new MariaResponse();
    mariaResponse.status = response.status;
    res.status(500).json(mariaResponse);
  }
};

exports.signUp = async (req, res) => {
  try {
    const { username, password, organization } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection('musicians');

    const existingUser = await collection.findOne({ _id: username });
    if (existingUser) {
      return res.status(409).json({
        status: {
          code: 'fail',
          message: 'User already exists',
        },
      });
    }

    const newUser = {
      _id: username,
      password,
      organization,
    };

    await collection.insertOne(newUser);

    const signUpResponse = {
      username: newUser._id,
      organization,
    };

    const response = {
      data: {
        items: [signUpResponse],
      },
      status: {
        code: 'success',
      },
    };

    res.status(201).json(response);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({
      status: {
        code: 'fail',
        message: 'Failed to create user',
      },
    });
  }
};
