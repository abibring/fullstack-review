const { getInfo, saveUser, getUser } = require('../models/index.js');
const {
  getIssuesFromGithub,
  getWatchingFromGithub,
  authenticateUser,
  getTokenForUser,
  getUserNotifications,
  getStarredRepos,
  getRepoEvents,
  associatedToIssue,
  getFeedForUser,
  getRepoIssues,
  getRepoNotifications,
  getRepoReleases
} = require('../api_helpers/github.js');
const { 
  addRankingToData, 
  isolateData, 
  updateRanking, 
  createArrayOfStarredRepoNameAndOwners, 
  getDataForStarredRepos, 
  sortIssuesFromPullRequests 
} = require('./sortingHelpers.js');
require('dotenv').config();

const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

module.exports = {
  login: {
    get: function(req, res) {
      const { query } = req;
      const { code } = query;
      if (!code) {
        return res.send({ success: false, message: 'Error: invalid code' });
      }
      getTokenForUser(code)
        .then(({ data }) => {
          const access_token = data.split('&')[0];
          const token = access_token.slice(13);

          const encryptedToken = cryptr.encrypt(token);
          authenticateUser(token)
            .then(({ data }) => {
              // saving user went here!
              res.send(`
                <html>
                    <body>
                      <script>
                          window.localStorage.setItem('userToken', '${encryptedToken}');
                          window.localStorage.setItem('username', '${data.login}');
                          window.location.pathname = '/home';
                      </script>
                    </body>
                </html>
              `);
            }).catch(() => res.redirect('/'));
        }).catch(err => res.send(err));
    }
  },

  logout: {
    get: function(req, res) {
      req.session = null;
      res.send();
    }
  },

  events: {
    get: function(req, res) {
      const { userToken, username } = req.query;
      getRepoEvents(userToken, username)
        .then(({ data }) => res.send(data))
        .catch(err => res.send(err));
    }
  },

  watching: {
    get: function(req, res) {
      const { userToken } = req.query;
      getWatchingFromGithub(userToken)
        .then(({ data }) => res.send(data))
        .catch(err => res.send(err));
    }
  },

  starred: {
    get: function(req, res) {
      const { userToken } = req.query;
      // console.log(getStarredRepos)
      getStarredRepos(userToken)
        .then(({ data }) => {
          // using data from API, create an array of objects that contain 
          // each repo name and owner that user has starred
          // console.log(data)
          console.log(JSON.stringify(getDataForStarredRepos));
          const reposStarred = createArrayOfStarredRepoNameAndOwners(data);
          const issuePromise = Promise.all(getDataForStarredRepos(reposStarred, userToken, getRepoIssues));
          const notificationPromise = Promise.all(getDataForStarredRepos(reposStarred, userToken, getRepoNotifications));
          const releasePromise = Promise.all(getDataForStarredRepos(reposStarred, userToken, getRepoReleases))
          // console.log(reposStarred);
          // call promises to resolve data from API
          issuePromise
            .then(issueData => {   
              console.log(issueData)      
              notificationPromise
                .then(notificationData => {
                  releasePromise
                    .then(releaseData => {
                      // store results in a variable
                      const releaseInfo = isolateData(releaseData);
                      const issueInfo = isolateData(issueData);
                      const notificationInfo = isolateData(notificationData);
                      const sortedPullRequestsFromIssuesPromise = sortIssuesFromPullRequests(issueInfo);
                      sortedPullRequestsFromIssuesPromise
                        .then(sortedRepos => {
                          const pullRequestRepos = sortedRepos[0];
                          const issueRepos = sortedRepos[1];
                          const rankedReleasedData = addRankingToData(releaseInfo, 1000, 'release');
                          const rankedIssueData = addRankingToData(pullRequestRepos, 250, 'issue');
                          const rankedPullRequests = addRankingToData(issueRepos, 150, 'pull_request');
                          const rankedNotificationInfo = addRankingToData(notificationInfo, 200, 'notification');
                          const tempResults = [...rankedReleasedData, ...rankedIssueData, ...rankedPullRequests, ...rankedNotificationInfo];
                          const finalResults = updateRanking(tempResults);
                          res.send(finalResults);        
                        }).catch(err => res.send(err));
                    }).catch(err => res.send(err));
                }).catch(err => res.send(err));
            }).catch(err => res.send(err));
        }).catch(err => res.send(err));
    }
  },

  notifications: {
    get: function(req, res) {
      const { userToken } = req.query;
      getUserNotifications(userToken)
        .then(({ data }) => res.send(data))
        .catch(err => res.send(err));
    }
  },
  associated: {
    get: function(req, res) {
      const { userToken } = req.query;
      associatedToIssue(userToken)
        .then(({ data }) => res.send(data))
        .catch(err => res.send(err));
    }
  },
  issues: {
    get: function(req, res) {
      const { userToken } = req.query;
      getIssuesFromGithub(userToken)
        .then(({ data }) => {
          // res.setHeader('link', data.headers.link)
          res.send(data);
        })
        .catch(err => res.send(err));
    }
  },
  feed: {
    get: function(req, res) {
      const { userToken } = req.query;
      getFeedForUser(userToken)
        .then(({ data }) => res.send(data))
        .catch(err => res.send(err));
    }
  },
  repos: {
    get: function(req, res) {
      getInfo((err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.setHeader('link', data.headers.link);
          res.send(data);
        }
      });
    }
  },

  wildcard: {
    get: function(req, res) {
      res.redirect('/');
    }
  }
}
