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
require('dotenv').config();
const { addRankingToData, isolateData, updateRanking } = require('./sortingHelpers.js');

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
          console.log('ACCESS', token);

          const encryptedToken = cryptr.encrypt(token);
          authenticateUser(token)
            .then(({ data }) => {
              console.log(data)
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
            })
            .catch(err => res.redirect('/'));
        })
        .catch(err => res.send(err));
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
        .then(({ data }) => {
          // console.log('DATA FROM REPO EVENTS', data.data);
          // let headersSplitOnToken = data.headers.link.split('?');
          // console.log('headersSplitOnToken', headersSplitOnToken);
          // res.setHeader('link', data.headers.link)
          res.send(data);
        })
        .catch(err => res.send(err));
    }
  },

  watching: {
    get: function(req, res) {
      const { userToken } = req.query;
      getWatchingFromGithub(userToken)
        .then(({ data }) => {
          // res.setHeader('link', data.headers.link)
          // console.log('WATCHING', data.data)
          res.send(data);
        })
        .catch(err => res.send(err));
    }
  },

  starred: {
    get: function(req, res) {
      const { userToken } = req.query;
      getStarredRepos(userToken)
        .then(({ data }) => {
          const reposStarred = [];
          // iterate over data & push repo name and owner into reposStarred array
          for (var i = 0; i < data.length; i++) {
            let repo = data[i];
            reposStarred.push({ repo: repo.name, owner: repo.owner.login });
          }
          // iterate over reposStarred & call issue endpoint for each repo. Store result.
          const issuePromise = Promise.all(
            reposStarred.map(repo => {
              return getRepoIssues(repo.owner, repo.repo, userToken);
            })
          );
          // iterate over reposStarred & call notification endpoint for each repo. Store result.
          const notificationPromise = Promise.all(
            reposStarred.map(repo => {
              return getRepoNotifications(repo.owner, repo.repo, userToken);
            })
          );
          // iterate over reposStarred & call release endpoint for each repo. Store result.
          const releasePromise = Promise.all(
            reposStarred.map(repo => {
              return getRepoReleases(repo.owner, repo.repo, userToken);
            })
          );
          // call issuePromise to resolve data from API
          issuePromise
            .then(issueData => {
              // call notificationPromise to resolve data from API
              notificationPromise
                .then(notificationData => {
                  // call releasePromise to resolve data from API
                  releasePromise
                    .then(releaseData => {
                      // store results in a variable
                      let releaseInfo = isolateData(releaseData);
                      let issueInfo = isolateData(issueData);
                      let notificationInfo = isolateData(notificationData);

                      let rankedReleasedData = addRankingToData(releaseInfo, 1);
                      let rankedIssueData = addRankingToData(issueInfo, .4);
                      let rankedNotificationInfo = addRankingToData(notificationInfo, .6);
                      // console.log('RANKED RELEASES', rankedReleasedData)
                      console.log('-------------------------------------------------');
                      // console.log('RANKED ISSUES', rankedIssueData)
                      console.log('-------------------------------------------------');
                      // console.log('RANKED NOTIFICATIONS', rankedNotificationInfo)
                      console.log('-------------------------------------------------');
                      let tempResults = [...rankedReleasedData, ...rankedIssueData, ...rankedNotificationInfo];
                      // use updateScore function
                      let finalResults = updateRanking(tempResults);
                      console.log('FINAL', finalResults)
                      res.send(finalResults)
                    })
                    .catch(err => res.send(err));
                })
                .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
        })
        .catch(err => res.send(err));
    }
  },

  notifications: {
    get: function(req, res) {
      const { userToken } = req.query;
      getUserNotifications(userToken)
        .then(({ data }) => {
          res.send(data);
        })
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
