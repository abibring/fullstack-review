const express = require('express');
const bodyParser = require('body-parser');
const router = require('./server/routes/index.js');
const cookieSession = require('cookie-session');
const path = require('path');
require('dotenv').config()
const app = express();

app.use(
  cookieSession({
    name: 'session',
    secret: 'splurgiesauce1',
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.use(express.static(path.join(__dirname, '/client/dist'), { redirect: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
