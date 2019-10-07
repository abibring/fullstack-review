const {
 getRepoIssues,
 getRepoBySearch,
 getRepoNotifications,
 getRepoReleases
} = require('../helper-functions/github.js')
module.exports = {
 getRepoBySearch: (req, res) => {
  const { repo, owner, userToken } = req.query;
  const hash = {};
  getRepoIssues(owner, repo, userToken)
    .then(({ data }) => {
      hash['issues'] = data;
    }).then(() => {
      getRepoNotifications(owner, repo, userToken)
      .then(({ data }) => {
        hash['notifications'] = data;
      })
    }).then(() => {
      getRepoReleases(owner, repo, userToken)
        .then(({ data }) => {
          hash['releases'] = data;
        })
    })
    .then(() => {
      let results = Object.values(hash);
      function flattenDeep(arr) {
        return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
      } 
      let r = flattenDeep(results);
      res.send(r);
    }).catch(e => res.send(e));
 },
 addRepo: (req, res) => {
  const { repoInfo, userToken } = req.body;
  starRepo(repoInfo, userToken)
    .then((data) => res.send(data))
    .catch(e => console.error('errrr', e));
 }
}