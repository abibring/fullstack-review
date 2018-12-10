const axios = require('axios');
const Cryptr = require('cryptr');
require('dotenv').config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

const getIssuesFromGithub = access_token => {
  access_token = cryptr.decrypt(access_token);
  return axios.get(`https://api.github.com/issues`, { params: { access_token, filter: 'all', sort: 'updated', direction: 'desc' }});
};

const getWatchingFromGithub = access_token => {
  access_token = cryptr.decrypt(access_token);
  return axios.get(`https://api.github.com/user/subscriptions`, { params: { access_token, direction: 'desc' }});
};

const authenticateUser = token => {
  let access_token = token.slice(13);
  return axios.get(`https://api.github.com/user`, { params: { access_token }});
};

const getTokenForUser = code => {
  return axios.post(`https://github.com/login/oauth/access_token`, { client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET, code });
};

const getUserNotifications = access_token => {
  access_token = cryptr.decrypt(access_token);
  return axios.get(`https://api.github.com/notifications`, { params: { access_token }});
}

const getStarredRepos = access_token => {
  access_token = cryptr.decrypt(access_token);
  return axios.get(`https://api.github.com/user/starred`, { params: { access_token, sort: 'updated', direction: 'desc' }});
}

const getRepoEvents = (access_token, username) => {
  access_token = cryptr.decrypt(access_token);
  return axios.get(`https://api.github.com/users/${username}/received_events`, { params: { access_token  }});
}

module.exports = {
  getIssuesFromGithub,
  getWatchingFromGithub,
  authenticateUser,
  getTokenForUser,
  getUserNotifications,
  getStarredRepos, 
  getRepoEvents
};
