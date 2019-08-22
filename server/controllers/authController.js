const { saveUser, getUser } = require('../models/index.js');
const { authenticateUser, getTokenForUser } = require('../helper-functions/github.js');
require('dotenv').config();
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

module.exports = {
  login: {
    get: async function(req, res) {
      const { query } = req;
      const { code } = query;
      if (!code) {
        return res.send({ success: false, message: 'Error: invalid code' });
      }
      // SAME CODE AS BELOW BUT USING ASYNC/AWAIT

      // let access_token;
      // let token;
      // let encryptedToken;
      // let savedUser;
      // const userToken = await getTokenForUser(code).catch(() => res.redirect("/"))
      // if (userToken && userToken.data) {
      //     access_token = data.split('&')[0];
      //     token = access_token.slice(13);
      //     encryptedToken = cryptr.encrypt(token);
      // }
      // const authUser = authenticateUser(token)
      //                   .catch((e) => {
      //                     console.error("error authenticating user", e)
      //                     res.send();
      //                   })
      // if (authUser && authUser.data) {
      //   savedUser = await saveUser(authUser.data)
      //                 .catch(e => {
      //                   res.send(`
      //                   <html>
      //                     <body>
      //                       <script>
      //                         window.localStorage.setItem('userToken', '${encryptedToken}');
      //                         window.localStorage.setItem('username', '${authUser.data.login}');
      //                         window.localStorage.setItem('avatar', '${authUser.data.avatar_url}');
      //                         window.location.pathname = '/home';
      //                       </script>
      //                     </body>
      //                   </html>
      //                 `);
      //                 })
      // if (savedUser && savedUser.data)
      //   res.send(`
      //   <html>
      //     <body>
      //       <script>
      //         window.localStorage.setItem('userToken', '${encryptedToken}');
      //         window.localStorage.setItem('username', '${savedUser.data.login}');
      //         window.localStorage.setItem('avatar', '${savedUser.data.avatar_url}');
      //         window.location.pathname = '/home';
      //       </script>
      //     </body>
      //   </html>
      // `);
      // } else {
      //   res.send(`
      //   <html>
      //     <body>
      //       <script>
      //         window.localStorage.setItem('userToken', '${encryptedToken}');
      //         window.localStorage.setItem('username', '${authUser.data.login}');
      //         window.localStorage.setItem('avatar', '${authUser.data.avatar_url}');
      //         window.location.pathname = '/home';
      //       </script>
      //     </body>
      //   </html>
      // `);
      // }
      getTokenForUser(code)
        .then(({ data }) => {
          const access_token = data.split('&')[0];
          const token = access_token.slice(13);
          const encryptedToken = cryptr.encrypt(token);
          authenticateUser(token)
            .then(({ data }) => {
              saveUser(data, (err, results) => {
                if (err) {
                  res.send(`
                    <html>
                      <body>
                        <script>
                          window.localStorage.setItem('userToken', '${encryptedToken}');
                          window.localStorage.setItem('username', '${data.login}');
                          window.localStorage.setItem('avatar', '${data.avatar_url}');
                          window.location.pathname = '/home';
                        </script>
                      </body>
                    </html>
                  `);
                } else {
                  res.send(`
                    <html>
                      <body>
                        <script>
                          window.localStorage.setItem('userToken', '${encryptedToken}');
                          window.localStorage.setItem('username', '${data.login}');
                          window.localStorage.setItem('avatar', '${data.avatar_url}');
                          window.location.pathname = '/home';
                        </script>
                      </body>
                    </html>
                  `);
                }
              });
              }).catch(err => {
                console.error("Error in login controller", err);
                res.send()
              })
            }).catch(() => res.redirect('/'));
        }
    },

  logout: {
    get: function(req, res) {
      req.session = null;
      res.send();
    }
  },
}