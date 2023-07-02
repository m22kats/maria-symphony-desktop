require('dotenv').config({ path: './config/.env' });

const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const dataController = require('./controllers/DataController');
const authController = require('./controllers/AuthController');

const app = express();
const port = process.env.PORT || 8080;
const ROOT_END_POINT = process.env.ROOT_END_POINT;

app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);
// Parse JSON request bodies
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`Maria Symphony API running on port ${port}`);
});

// Auth Endpoints
app.post('/musicians/signin', authController.login);
app.post('/musicians/signup', authController.signUp);

// Entities Endpoints
app.get(`${ROOT_END_POINT}/entities`, dataController.getAllEntities);
app.get(`${ROOT_END_POINT}/entities/page`, dataController.searchEntities);
app.post(`${ROOT_END_POINT}/entities`, dataController.createEntity);
app.post(`${ROOT_END_POINT}/entities/delete`, dataController.deleteEntities);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
