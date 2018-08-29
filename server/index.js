const express = require('express');
let app = express();
const bodyParser = require('body-parser')
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const {saved} = require('../database/index.js');
// if you need CORS headers, add them

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // console.log(`AWWWW: ${JSON.stringify(req.body.name)}`)
  let { name } = req.body;
  getReposByUsername(name, (err, results) => {
    if (err) {
      console.error(`err in getReposByUsername: ${err}`);
      res.send('ERROR')
    } else {
      // console.log(`githubObj: ${JSON.stringify(results)}`);
      saved(results);
      res.send(results)
    
    }
  })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

