const { getInfo, saveUser, getUser } = require('../models/index.js');
const { 
  getIssuesFromGithub, 
  getWatchingFromGithub, 
  authenticateUser, 
  getTokenForUser, 
  getUserNotifications, 
  getStarredRepos, 
  getRepoEvents 
} = require('../api_helpers/github.js');
const { CRYPTR_SECRET } = require('../../config.js');
const Cryptr = require('cryptr');

const cryptr = new Cryptr(CRYPTR_SECRET);

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
              saveUser(data, (err) => {
                if (err) {
                  getUser(data.email, (err, results) => {
                    if (err) {
                      res.send(`
                        <html>
                            <body>
                              <script>
                                  window.localStorage.setItem('userToken', 'invalid');
                                  window.localStorage.setItem('username', 'invalid');
                                  window.location.pathname = '/';
                              </script>
                            </body>
                        </html>`);
                    } else {
                      res.send(`
                        <html>
                            <body>
                              <script>
                                  window.localStorage.setItem('userToken', '${encryptedToken}');
                                  window.localStorage.setItem('username', '${results[0].username}');
                                  window.location.pathname = '/home';
                              </script>
                            </body>
                        </html>`);
                    }
                  });
                } else {
                  res.send(`
                    <html>
                        <body>
                          <script>
                              window.localStorage.setItem('userToken', '${encryptedToken}');
                              window.localStorage.setItem('username', '${data.username}');
                              window.location.pathname = '/home';
                          </script>
                        </body>
                    </html>
                  `);
                }
              });
            }).catch(err => console.error('err in getTokenForUser', err));
          }).catch(err => console.error('err in getTokenForUser Outside', err));
        }
    },

  logout: {
    get: function(req, res) {
      req.session = null;
      res.send();
    }
  },

  events: {
    get: function (req, res) {
      const { userToken, username } = req.query;
      getRepoEvents(userToken, username)
        .then((data) => {
          // console.log('DATA FROM REPO EVENTS', data.data);
          let headersSplitOnToken = data.headers.link.split('?');
          console.log('headersSplitOnToken', headersSplitOnToken);
          res.setHeader('link', data.headers.link)
          res.send(data.data)
        })
        .catch(err => res.send(err));
    }
  },

  watching: {
    get: function(req, res) {
      const { userToken } = req.query;
      getWatchingFromGithub(userToken)
        .then(({data}) => {
          // res.setHeader('link', data.headers.link)
          // console.log('WATCHING', data.data)
          res.send(data)
        })
        .catch(err => res.send(err));
    }
  },

  starred: {
    get: function(req, res) {
      const { userToken } = req.query;
      getStarredRepos(userToken)
        .then(({data}) => {
          // res.setHeader('link', data.headers.link)
          res.send(data)
        })
        .catch(err => res.send(err));
    }
  },

  notifications: {
    get: function(req, res) {
      const { userToken } = req.query;
      getUserNotifications(userToken)
        .then(({data}) => {
          // res.setHeader('link', data.headers.link)
          res.send(data);
        })
        .catch(err => res.send(err));
    }
  },

  issues: {
    get: function(req, res) {
      const { userToken } = req.query;
      getIssuesFromGithub(userToken)
        .then(({data}) => {
          // res.setHeader('link', data.headers.link)
          res.send(data)
        })
        .catch(err => res.send(err));
    }
  },

  repos: {
    get: function(req, res) {
      getInfo((err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.setHeader('link', data.headers.link)
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