const {
  getStarredRepos,
  getRepoIssues,
  getRepoNotifications,
  getRepoReleases,
  getReposOwned,
  getReposCollab,
  getReposOrg
} = require('../api_helpers/github.js');
const { 
  addRankingToData, 
  isolateData, 
  updateRanking, 
  createArrayOfStarredRepoNameAndOwners, 
  getDataForStarredRepos, 
  sortIssuesFromPullRequests,
  getDataForOwnedRepos,
  isolateData2 
} = require('./sortingHelpers.js');
require('dotenv').config();


module.exports = {

  org: {
    get: function(req, res) {
      const { userToken } = req.query;
      getReposOrg(userToken)
        .then(({ data }) => {
          const tempArray = createArrayOfStarredRepoNameAndOwners(data);
          const tempIssues = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoIssues));
          const tempStarred = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoNotifications));
          const tempRelease = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoReleases));
          tempIssues
            .then(issueData => {
              tempStarred
                .then(starredData => {
                  tempRelease
                    .then(releaseData => {
                      const issueIsolated = isolateData(issueData);
                      const starredIsolated = isolateData(starredData);
                      const releaseIsolated = isolateData(releaseData);
                      if (issueIsolated.length > 0) {
                        const sortedPullRequests = sortIssuesFromPullRequests(issueIsolated);
                        sortedPullRequests
                          .then(sortedRepos => {
                            const pullRepos = sortedRepos[0];
                            const issueRepos = sortedRepos[1];
                            const rankedReleasedData = addRankingToData(releaseIsolated, 1000, 'release');
                            const rankedIssueData = addRankingToData(pullRepos, 250, 'pull_request');
                            const rankedPullRequests = addRankingToData(issueRepos, 150, 'issue');
                            const temp = [...rankedReleasedData, ...rankedIssueData, ...rankedPullRequests];
                            const finalResults = updateRanking(temp);
                            res.send(finalResults);
                          })
                          .catch(e => res.send(e))
                      } else if (starredIsolated.length === 0 && releaseIsolated.length === 0) {
                        res.send([])
                      } else {
                        const rankedIssueData = addRankingToData(starredIsolated, 250, 'pull_request');
                        const rankedPullRequests = addRankingToData(releaseIsolated, 150, 'issue');
                        res,send([...rankedIssueData, ...rankedPullRequests]);
                      }
                    }).catch(e => res.send(e))
                }).catch(e => res.send(e))
            }).catch(e => res.send(e))
        })
        .catch(e => res.send(e));
    }
  },

  collab: {
    get: function(req, res) {
      const { userToken } = req.query;
      getReposCollab(userToken)
        .then(({ data }) => {
          const tempArray = createArrayOfStarredRepoNameAndOwners(data);
          const tempIssues = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoIssues));
          const tempStarred = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoNotifications));
          const tempRelease = Promise.all(getDataForStarredRepos(tempArray, userToken, getRepoReleases));
          tempIssues
            .then(issueData => {
              tempStarred
                .then(starredData => {
                  tempRelease
                    .then(releaseData => {
                      const issueIsolated = isolateData2(issueData);
                      const starredIsolated = isolateData2(starredData);
                      const releaseIsolated = isolateData2(releaseData);
                      if (issueIsolated.length > 0) {
                        const sortedPullRequests = sortIssuesFromPullRequests(issueIsolated);
                        sortedPullRequests
                          .then(sortedRepos => {
                            const pullRepos = sortedRepos[0];
                            const issueRepos = sortedRepos[1];
                            const rankedReleasedData = addRankingToData(releaseIsolated, 1000, 'release');
                            const rankedIssueData = addRankingToData(pullRepos, 250, 'pull_request');
                            const rankedPullRequests = addRankingToData(issueRepos, 150, 'issue');
                            const temp = [...rankedReleasedData, ...rankedIssueData, ...rankedPullRequests];
                            const finalResults = updateRanking(temp);
                            res.send(finalResults);
                          })
                          .catch(e => res.send(e))
                      } else if (starredIsolated.length === 0 && releaseIsolated.length === 0) {
                        res.send([])
                      } else {
                        const rankedIssueData = addRankingToData(starredIsolated, 250, 'pull_request');
                        const rankedPullRequests = addRankingToData(releaseIsolated, 150, 'issue');
                        res,send([...rankedIssueData, ...rankedPullRequests]);
                      }
                    }).catch(e => res.send(e))
                }).catch(e => res.send(e))
            }).catch(e => res.send(e))
        }).catch(e => res.send(e))
    }
  },

  starred: {
    get: function(req, res) {
      const { userToken } = req.query;
      getStarredRepos(userToken)
        .then(({ data }) => {
          // using data from API, create an array of objects that contain each repo name and owner that user has starred
          const reposStarred = createArrayOfStarredRepoNameAndOwners(data);
          const issuePromise = Promise.all(getDataForStarredRepos(reposStarred, userToken, getRepoIssues));
          const notificationPromise = Promise.all(getDataForStarredRepos(reposStarred, userToken, getRepoNotifications));
          const releasePromise = Promise.all(getDataForStarredRepos(reposStarred, userToken, getRepoReleases))

          // call promises to resolve data from API
          issuePromise
            .then(issueData => {   
              notificationPromise
                .then(notificationData => {
                  releasePromise
                    .then(releaseData => {
                      // store results in a variable
                      const releaseInfo = isolateData(releaseData);
                      const issueInfo = isolateData(issueData);
                      const notificationInfo = isolateData(notificationData);
                      const sortedPullRequestsFromIssuesPromise = Promise.all(sortIssuesFromPullRequests(issueInfo));
                      sortedPullRequestsFromIssuesPromise
                        .then(sortedRepos => {
                          const pullRequestRepos = sortedRepos[0];
                          const issueRepos = sortedRepos[1];
                          const rankedReleasedData = addRankingToData(releaseInfo, 1000, 'release');
                          const rankedIssueData = addRankingToData(pullRequestRepos, 250, 'pull_request');
                          const rankedPullRequests = addRankingToData(issueRepos, 150, 'issue');
                          if (notificationInfo !== undefined) {
                            var rankedNotificationInfo = addRankingToData(notificationInfo, 200, 'notification');
                            var tempResults = [...rankedReleasedData, ...rankedIssueData, ...rankedPullRequests, ...rankedNotificationInfo];
                            const finalResults = updateRanking(tempResults);
                            res.send(finalResults);        
                          } else {
                            var tempResults = [...rankedReleasedData, ...rankedIssueData, ...rankedPullRequests];   
                            res.send(updateRanking(tempResults))              }
                        }).catch(err => res.send(err));
                    }).catch(err => res.send(err));
                }).catch(err => res.send(err));
            }).catch(err => res.send(err));
        }).catch(err => res.send(err));
    }
  },

  wildcard: {
    get: function(req, res) {
      res.redirect('/');
    }
  }
}
