const {
 getReposStarred,
 getRepoNotifications,
 getRepoIssues,
} = require('../helper-functions/github.js')
const {
 arrayOfRepoNameAndOwner,
 addRankingToRepos,
 removeDuplicatesAndSortByRanking,

} = require('../helper-functions/sortingHelpers.js')
module.exports = {
 get: (req, res) => {
  const { userToken } = req.query;
  getReposStarred(userToken)
  .then(({ data }) => {
    let hash = {};
    const reposStarred = arrayOfRepoNameAndOwner(data);
    const promise = Promise.all(reposStarred.map(repo => {
      return getRepoIssues(repo.owner, repo.repo, userToken)
      .then(({ data })=> {
        hash[`issues-${repo.owner}`] = data;
        return getRepoNotifications(repo.owner, repo.repo, userToken) 
        .then(({ data }) => {
          hash[`notifications-${repo.owner}`] = data;
          return getRepoReleases(repo.owner, repo.repo, userToken)
          .then(({ data }) => {
            hash[`releases-${repo.owner}`] = data;
            return hash;
          })
        })
      }).catch(e => console.error('err in getRepoNotifications', e));
    }));
    promise.then((hash) => {       
      const results = [];
      for (let i = 0; i < hash.length; i++) {
        const h = hash[i];
        for (let key in h) {
          if (Array.isArray(h[key]) && h[key].length > 0) {
            results.push(h[key])
          }
        }
      }
      function flattenDeep(arr) {
        return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
      }        
      let arrayOfData = flattenDeep(results);
      addRankingToRepos(arrayOfData);
      let finalSortedResults = removeDuplicatesAndSortByRanking(arrayOfData);
      
      res.send(finalSortedResults);
      }).catch(e => {
        console.error('error in promise of associated starred', e);
        res.send();
      });
    }).catch(e => {
      console.error('Error in getReposStarred controller', e);
      res.send();
    });
  }
}