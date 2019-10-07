const {
 searchForRepo
} = require('../helper-functions/github.js')
module.exports = {
 post: (req, res) => {
  const { repo, userToken } = req.body;
  searchForRepo(repo, userToken)
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
 }
}