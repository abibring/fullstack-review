const { getReposStarred, getRepoIssues, getRepoNotifications, getRepoReleases, getReposAssociatedWith } = require('../helper-functions/github.js');
const { removeDuplicatesAndSortByRanking, arrayOfRepoNameAndOwner, addRankingToRepos } = require('../helper-functions/sortingHelpers.js');
require('dotenv').config();

module.exports = {

  associated: {
    get: function(req, res) {
      const { userToken } = req.query;
      
      getReposAssociatedWith(userToken)
      .then(({ data }) => {
        const hash = {};
        const reposStarred = arrayOfRepoNameAndOwner(data);
        let promise = Promise.all(reposStarred.map(repo => {
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
            let h = hash[i];
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
          }).catch(e => res.send(e));
        }).catch(e => res.send(e));
      }
  },

  starred: {
    get: function(req, res) {
      const { userToken } = req.query;
      
      getReposStarred(userToken)
      .then(({ data }) => {
        const hash = {};
        const reposStarred = arrayOfRepoNameAndOwner(data);
        let promise = Promise.all(reposStarred.map(repo => {
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
            let h = hash[i];
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
          }).catch(e => res.send(e));
        }).catch(e => res.send(e));
      }
    },

  wildcard: {
    get: function(req, res) {
      res.redirect('/');
    }
  }
}
