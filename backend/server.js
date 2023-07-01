require('dotenv').config({ path: './config/.env' });

const express = require('express');
const bodyParser = require('body-parser');
const dataController = require('./controllers/dataController');
const authController = require('./controllers/authController');

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`Maria Symphony API running on port ${port}`);
});

ROOT_END_POINT = process.env.ROOT_END_POINT;

// Auth Endpoints
app.post('/musicians/signin', authController.login);
app.post('/musicians/signup', authController.signUp);

// Entities Endpoints
app.get(`${ROOT_END_POINT}/entities`, dataController.getAllEntities);
app.get(`${ROOT_END_POINT}/entities/page`, dataController.searchEntities);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
