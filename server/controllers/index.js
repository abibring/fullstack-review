const { getInfo, saveUser, getUser } = require('../models/index.js');
const { getIssuesFromGithub, getWatchingFromGithub, authenticateUser, getTokenForUser, getUserNotifications, getStarredRepos, getRepoEvents } = require('../api_helpers/github.js');

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
          authenticateUser(access_token)
            .then(({ data }) => {
              req.session.userId = data.id;
              // bcrypt.hash(token, saltRounds, (err, hash) => {
              //   if (err) {
              //     console.error('err in hashing token', err);
              //   } else {
              saveUser(data, token, (err) => {
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
                                  window.localStorage.setItem('userToken', '${token}');
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
                              window.localStorage.setItem('userToken', '${token}');
                              window.localStorage.setItem('username', '${data.username}');
                              window.location.pathname = '/home';
                          </script>
                        </body>
                    </html>
                  `);
                }
              });
              // }
          //     bcrypt.compare(token, hash)
          //       .then(res => console.log('bcrypt.compare res', res))
          //       .catch(err => console.error('bcrypt.compare err', err));
          // })
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
      getStarredRepos(userToken)
        .then(({ data }) => res.send(data))
        .catch(err => res.send(err));
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
  issues: {
    get: function(req, res) {
      const { userToken } = req.query;
      getIssuesFromGithub(userToken)
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