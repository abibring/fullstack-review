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
          authenticateUser(access_token)
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
            })
            .catch(err => res.send(err));
        })
        .catch(err => res.send(err));
    }
  },

  // signup: {
  //   post: function(req, res) {
  //     const { query } = req;
  //     const { code } = query;
  //     if (!code) {
  //       return res.send({ success: false, message: 'Error: invalid code' });
  //     }
  //     getTokenForUser(code)
  //       .then(({ data }) => {
  //         const access_token = data.split('&')[0];
  //         const token = access_token.slice(13);
  //         const encryptedToken = cryptr.encrypt(token);
  //         authenticateUser(access_token)
  //           .then(({ data }) => {
  //              saveUser(data, (err, results) => {
  //               if (err) {
  //                 res.send(`
  //                   <html>
  //                       <body>
  //                         <script>
  //                             window.localStorage.setItem('userToken', 'invalid');
  //                             window.localStorage.setItem('username', 'invalid');
  //                             window.location.pathname = '/';
  //                         </script>
  //                       </body>
  //                   </html>`);
  //               } else {
  //                 res.send(`
  //                   <html>
  //                       <body>
  //                         <script>
  //                             window.localStorage.setItem('userToken', '${encryptedToken}');
  //                             window.localStorage.setItem('username', '${results[0].username}');
  //                             window.location.pathname = '/home';
  //                         </script>
  //                       </body>
  //                   </html>`);
  //                 }
  //               });
  //           }).catch(err => console.error('err in savingUser', err));
  //         }).catch(err => console.error('err in savingUser Outside', err));
  // },
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
            .then(dataOne => {
              // call notificationPromise to resolve data from API
              notificationPromise
                .then(dataTwo => {
                  // call releasePromise to resolve data from API
                  releasePromise
                    .then(dataThree => {
                      // store results in a variable
                      var tempResult = [...dataOne, ...dataTwo, ...dataThree];
                      var results = [];
                      // iterate over tempResult and push the "data" key into results
                      for (var i = 0; i < tempResult.length; i++) {
                        if (
                          tempResult[i].data &&
                          tempResult[i].data.length > 0
                        ) {
                          results.push(tempResult[i].data);
                        }
                      }
                      return results;
                    })
                    // call the result in a .then to ensure headers aren't sent multiple times
                    .then(result => res.send(result))
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
};
