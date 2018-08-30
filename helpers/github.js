const request = require('request');
const config = require('../config.js');

const getReposByUsername = (user, cb) => {
  console.log(`username: ${user}`)
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  
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
    // console.log(`body in request npm ${JSON.stringify(body)}`);
    // response.end(err, response, body)

  });
}

module.exports.getReposByUsername = getReposByUsername;