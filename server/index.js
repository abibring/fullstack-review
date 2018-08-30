const express = require('express');
let app = express();
const bodyParser = require('body-parser')
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const {saved, getInfo} = require('../database/index.js');
const JSON = require('circular-json');
// if you need CORS headers, add them

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/repos', function (req, res) {
  let { name } = req.body;
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

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log(`GET req on server: ${JSON.stringify(req)}`)
  getInfo((err, data) => {
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
    
  })
});

let port = 1128;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

