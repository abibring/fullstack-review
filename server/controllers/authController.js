const { saveUser, getUser } = require('../models/index.js');
const { authenticateUser, getTokenForUser } = require('../helper-functions/github.js');
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
              // saving user went here!
              // getUser(data.login, (err, user) => {
              //   if (err || user.length === 0) {
              //     saveUser(data, (err2) => {
              //       if (err2) {
              //         res.redirect('/');
              //       } else {
              //         res.send(`
              //         <html>
              //             <body>
              //               <script>
              //                   window.localStorage.setItem('userToken', '${encryptedToken}');
              //                   window.localStorage.setItem('username', '${data.login}');
              //                   window.localStorage.setItem('avatar', '${data.avatar_url}');
              //                   window.location.pathname = '/home';
              //               </script>
              //             </body>
              //         </html>
              //       `);
              //       }
              //     });
              //   } else {
              //     res.send(`
              //       <html>
              //           <body>
              //             <script>
              //                 window.localStorage.setItem('userToken', '${encryptedToken}');
              //                 window.localStorage.setItem('username', '${user[0].username}');
              //                 window.localStorage.setItem('avatar', '${user[0].avatar}');
              //                 window.location.pathname = '/home';
              //             </script>
              //           </body>
              //       </html>
              //     `);
              //   }
              // });
            }).catch(() => res.redirect('/'));
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