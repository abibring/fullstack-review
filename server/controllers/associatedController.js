const {
 getReposAssociatedWith,
 getRepoIssues,
 getRepoNotifications,
 getRepoReleases,
 
} = require('../helper-functions/github.js')
const {
 arrayOfRepoNameAndOwner,
 addRankingToRepos,
 removeDuplicatesAndSortByRanking
} = require('../helper-functions/sortingHelpers.js')
require('dotenv').config();

module.exports = {
  get: (req, res) => {
   const { userToken } = req.query;
   console.log('\n\n\n USER TOKEN IN GET', userToken, '\n\n\n')
    
    getReposAssociatedWith(userToken)
    .then(({ data }) => {
     console.log('DATA INSIDE SHIT', data)
      const hash = {};
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
            }).catch(e => console.error('err in getRepoRelease', e));
          }).catch(e => console.error('err in getRepoNotifications', e));
        }).catch(e => console.error('err in getRepoIssues', e));
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
        arrayOfData = removeDuplicatesAndSortByRanking(arrayOfData);

        res.send(finalSortedResults);
        }).catch(e => res.send(e));
      }).catch(e => res.send(e));
    }
}