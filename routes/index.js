const bcrypt = require('bcrypt');
const router = require('express').Router();
const saltRounds = 10;
const { getIssuesFromGithub, getWatchingFromGithub, authenticateUser, getTokenForUser, getUserNotifications, getStarredRepos, getRepoEvents } = require('../helpers/github.js');
const { saved, getInfo, saveUser, getUser } = require('../database/index.js');

router.get('/user/signin/callback', (req, res) => {
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
});  

router.get('/logout', (req, res) => {
  req.session = null;
  res.send();
});

router.get('/user/events', (req, res) => {
  const { userToken, username } = req.query;
  getRepoEvents(userToken, username)
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
})

router.get('/user/watching', (req, res) => {
  const { userToken } = req.query;
  getWatchingFromGithub(userToken)
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
});

router.get('/user/starred', (req, res) => {
  const { userToken } = req.query;
  getStarredRepos(userToken)
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
});

router.get('/user/notifications', (req, res) => {
  const { userToken } = req.query;
  getUserNotifications(userToken)
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
});

router.get('/user/issues', (req, res) => {
  let { userToken } = req.query;
  getIssuesFromGithub(userToken)
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
});

router.get('/repos', (req, res) => {
  getInfo((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.get('/*', (req, res) => res.redirect('/'));

module.exports = router;

// ADD THIS:
// function githubRedirectEndpoint(req, res) {
//   const newUser = await prisma.mutation.createUser({ data: ... });

//   const encryptedAuthorizationHeaderForLoggedInUser = getEncryptedAuthToken( newUser.id );

//    res.send(`
//      <html>
//         <body>
//            <script>
//                window.localStorage.setItem('userToken', '${encryptedAuthorizationHeaderForLoggedInUser}');
//                window.location.pathname = '/home';
//            </script>
//         </bod>
//      </html>
//   ` );
// }