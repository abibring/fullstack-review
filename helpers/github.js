const axios = require('axios');
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../config.js');

const getIssuesFromGithub = (token) => {
  return axios.get(`https://api.github.com/issues`, { params: { access_token: token, filter: 'all', state: 'all', direction: 'desc'}});
};

const getWatchingFromGithub = (token) => {
  return axios.get(`https://api.github.com/user/subscriptions`, { params: { access_token: token, direction: 'desc'}});
};

const authenticateUser = access_token => {
  return axios.get(`https://api.github.com/user?${access_token}`);
};

const getTokenForUser = code => {
  return axios.post(`https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`);
};

const getUserNotifications = token => {
  return axios.get(`https://api.github.com/notifications?access_token=${token}&all=true`);
}

const getStarredRepos = token => {
  return axios.get(`https://api.github.com/user/starred?access_token=${token}&sort=updated&direction=desc`);
}

const getRepoEvents = (token, username) => {
  return axios.get(`https://api.github.com/users/${username}/received_events`, { params: { access_token: token }});
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
