const axios = require('axios');
const Cryptr = require('cryptr');
require('dotenv').config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

const authenticateUser = access_token => {
  return axios.get(`https://api.github.com/user`, { params: { access_token } });
};

const getTokenForUser = code => {
  return axios.post(`https://github.com/login/oauth/access_token`, {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  });
};

const getReposStarred = access_token => {
  access_token = cryptr.decrypt(access_token);
  return axios.get(`https://api.github.com/user/starred`, {
    params: { access_token, sort: 'updated', direction: 'desc' }
  });
};

const getRepoIssues = (owner, repo, access_token) => {
  access_token = cryptr.decrypt(access_token);
  return axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    params: { access_token, state: 'open', direction: 'desc', sort: 'updated' }
  });
};

const getRepoNotifications = (owner, repo, access_token) => {
  access_token = cryptr.decrypt(access_token);
  return axios.get(
    `https://api.github.com/repos/${owner}/${repo}/notifications`,
    { params: { access_token, sort: 'updated', direction: 'desc' } }
  );
};

const getRepoReleases = (owner, repo, access_token) => {
  access_token = cryptr.decrypt(access_token);
  return axios.get(`https://api.github.com/repos/${owner}/${repo}/releases`, {
    params: { access_token, direction: 'desc', sort: 'published' }
  });
};

const getReposAssociatedWith = access_token => {
  access_token = cryptr.decrypt(access_token);
  return axios.get(`https://api.github.com/user/repos`, {
    params: {
      access_token,
      sort: 'updated',
      direction: 'desc'
    }
  });
};

module.exports = { 
  authenticateUser, 
  getTokenForUser, 
  getReposStarred, 
  getRepoIssues, 
  getRepoNotifications, 
  getRepoReleases,
  getReposAssociatedWith
}