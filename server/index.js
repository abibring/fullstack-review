const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser')
const { getReposByUsername } = require('../helpers/github.js');
const { saved, getInfo } = require('../database/index.js');
const JSON = require('circular-json');
// if you need CORS headers, add them

app.use(express.static(__dirname + '/client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/repos', (req, res) => {
  const { name } = req.body;
  getReposByUsername(name, (err, results) => {
    if (err) {
      console.error(`err in getReposByUsername: ${err}`);
      res.send('ERROR')
    } else {
      saved(results);
      res.send(results);
    }
  })
});

app.get('/repos', (req, res) => {
  getInfo((err, data) => {
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

