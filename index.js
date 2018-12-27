const express = require('express');
const bodyParser = require('body-parser');
const router = require('./server/routes/index.js');
const cookieSession = require('cookie-session');
const compression = require('compression');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(compression());
app.use(cookieSession({
  name: 'session',
  secret: 'splurgiesauce1',
  saveUninitialized: true,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
  
app.use(express.static(path.join(__dirname, '/client/dist'), { redirect: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);
app.use('/*', (req, res) => res.redirect('/'));
let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
// const compression = require('compression');
// app.use(compression({
//   level: 2,               // set compression level from 1 to 9 (6 by default)
//   filter: shouldCompress, // set predicate to determine whether to compress
// }));
