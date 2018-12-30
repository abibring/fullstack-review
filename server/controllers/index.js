const { getStarredRepos, getRepoIssues, getRepoNotifications, getRepoReleases, getReposOwned, getReposCollab, getReposOrg } = require('../helper-functions/github.js');
const { updateRanking, arrayOfRepoNameAndOwner, sortEventsAndGiveRanking } = require('../helper-functions/sortingHelpers.js');
require('dotenv').config();

module.exports = {

  // org: {
  //   get: function(req, res) {
  //     const { userToken } = req.query;
  //     getReposOrg(userToken)
  //       .then(({ data }) => {
  //         const tempArray = arrayOfRepoNameAndOwner(data);
  //         const tempIssues = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoIssues));
  //         const tempStarred = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoNotifications));
  //         const tempRelease = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoReleases));
  //         tempIssues
  //           .then(issueData => {
  //             tempStarred
  //               .then(starredData => {
  //                 tempRelease
  //                   .then(releaseData => {
  //                     const issueIsolated = isolateData(issueData);
  //                     const starredIsolated = isolateData(starredData);
  //                     const releaseIsolated = isolateData(releaseData);
  //                     if (issueIsolated.length > 0) {
  //                       const sortedPullRequests = sortIssuesFromPullRequests(issueIsolated);
  //                       sortedPullRequests
  //                         .then(sortedRepos => {
  //                           const pullRepos = sortedRepos[0];
  //                           const issueRepos = sortedRepos[1];
  //                           const rankedReleasedData = addRankingToData(releaseIsolated, 1000, 'release');
  //                           const rankedIssueData = addRankingToData(pullRepos, 250, 'pull_request');
  //                           const rankedPullRequests = addRankingToData(issueRepos, 150, 'issue');
  //                           const temp = [...rankedReleasedData, ...rankedIssueData, ...rankedPullRequests];
  //                           const finalResults = updateRanking(temp);
  //                           res.send(finalResults);
  //                         })
  //                         .catch(e => res.send(e))
  //                     } else if (starredIsolated.length === 0 && releaseIsolated.length === 0) {
  //                       res.send([])
  //                     } else {
  //                       const rankedIssueData = addRankingToData(starredIsolated, 250, 'pull_request');
  //                       const rankedPullRequests = addRankingToData(releaseIsolated, 150, 'issue');
  //                       res,send([...rankedIssueData, ...rankedPullRequests]);
  //                     }
  //                   }).catch(e => res.send(e))
  //               }).catch(e => res.send(e))
  //           }).catch(e => res.send(e))
  //       })
  //       .catch(e => res.send(e));
  //   }
  // },

  // collab: {
  //   get: function(req, res) {
  //     const { userToken } = req.query;
  //     getReposCollab(userToken)
  //       .then(({ data }) => {
  //         const tempArray = arrayOfRepoNameAndOwner(data);
  //         const tempIssues = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoIssues));
  //         const tempStarred = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoNotifications));
  //         const tempRelease = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoReleases));
  //         tempIssues
  //           .then(issueData => {
  //             tempStarred
  //               .then(starredData => {
  //                 tempRelease
  //                   .then(releaseData => {
  //                     const issueIsolated = isolateData2(issueData);
  //                     const starredIsolated = isolateData2(starredData);
  //                     const releaseIsolated = isolateData2(releaseData);
  //                     if (issueIsolated.length > 0) {
  //                       const sortedPullRequests = sortIssuesFromPullRequests(issueIsolated);
  //                       sortedPullRequests
  //                         .then(sortedRepos => {
  //                           const pullRepos = sortedRepos[0];
  //                           const issueRepos = sortedRepos[1];
  //                           const rankedReleasedData = addRankingToData(releaseIsolated, 1000, 'release');
  //                           const rankedIssueData = addRankingToData(pullRepos, 250, 'pull_request');
  //                           const rankedPullRequests = addRankingToData(issueRepos, 150, 'issue');
  //                           const temp = [...rankedReleasedData, ...rankedIssueData, ...rankedPullRequests];
  //                           const finalResults = updateRanking(temp);
  //                           res.send(finalResults);
  //                         })
  //                         .catch(e => res.send(e))
  //                     } else if (starredIsolated.length === 0 && releaseIsolated.length === 0) {
  //                       res.send([])
  //                     } else {
  //                       const rankedIssueData = addRankingToData(starredIsolated, 250, 'pull_request');
  //                       const rankedPullRequests = addRankingToData(releaseIsolated, 150, 'issue');
  //                       res,send([...rankedIssueData, ...rankedPullRequests]);
  //                     }
  //                   }).catch(e => res.send(e))
  //               }).catch(e => res.send(e))
  //           }).catch(e => res.send(e))
  //       }).catch(e => res.send(e))
  //   }
  // },

  starred: {
    get: function(req, res) {
      const { userToken } = req.query;
      getStarredRepos(userToken)
      .then(({ data }) => {
        var hash = {};
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
          sortEventsAndGiveRanking(arrayOfData);
          let finalSortedResults = updateRanking(arrayOfData);
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
