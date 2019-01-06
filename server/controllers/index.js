const { 
  getReposStarred, 
  getRepoIssues, 
  getRepoNotifications, 
  getRepoReleases, 
  getReposAssociatedWith, 
  searchForRepo ,
  starRepo
} = require('../helper-functions/github.js');
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
          }).catch(e => res.send());
        }).catch(e => res.send());
      }
    },

    search: {
      post: function(req, res) {
        const { repo, userToken } = req.body;
        searchForRepo(repo, userToken)
          .then(({ data }) => res.send(data))
          .catch(err => res.send(err));
      }
    },

    repoBySearch: {
      get: function(req, res) {
        const { repo, owner, userToken } = req.query;
        var hash = {};
        getRepoIssues(owner, repo, userToken)
          .then(({ data }) => {
            hash['issues'] = data;
            // return hash;
          }).then(() => {
            getRepoNotifications(owner, repo, userToken)
            .then(({ data }) => {
              hash['notifications'] = data;
              // return hash;
            })
          }).then(() => {
            getRepoReleases(owner, repo, userToken)
              .then(({ data }) => {
                hash['releases'] = data;
                // return hash;
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
      }
    },

    addRepo: {
      put: function(req, res) {
        const { repoInfo, userToken } = req.body;
        starRepo(repoInfo, userToken)
          .then((data) => {
            console.log('DATA', data)
            res.send(data)
          })
          .catch(e => {
            console.error('errrr', e);
          });
      }
    },


  wildcard: {
    get: function(req, res) {
      res.redirect('/');
    }
  }
}
