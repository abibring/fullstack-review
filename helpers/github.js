const request = require('request');
const config = require('../config.js');

const getReposByUsername = (user, cb) => {
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  }
  request.get(options, (err, githubObj) => {
    if (err) {
      console.log(`err in request npm: ${JSON.stringify(err)}`);
      cb(err, null)
    } else {
      // console.log(`res in request npm: ${JSON.stringify(githubObj)}`)
      cb(null, githubObj)
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;