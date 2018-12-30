const {
  getStarredRepos,
  getRepoIssues,
  getRepoNotifications,
  getRepoReleases,
  getReposOwned,
  getReposCollab,
  getReposOrg
} = require('../helper-functions/github.js');
const { 
  addRankingToData, 
  isolateData, 
  updateRanking, 
  createArrayOfStarredRepoNameAndOwners, 
  getDataForStarredRepos, 
  sortIssuesFromPullRequests,
  getDataForOwnedRepos,
  isolateData2 
} = require('../helper-functions/sortingHelpers.js');
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
          hash = {};
          // using data from API, create an array of objects that contain each repo name and owner that user has starred
          const reposStarred = createArrayOfStarredRepoNameAndOwners(data);
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
                        // console.log(hash)
                        return hash;
                      })
                    })
                  })
                }))
                 promise.then((hash) => {
                    var issues = [];
                    var releases = [];
                    var notifications = [];
                    let issueKey = Object.keys(hash).filter(k => k.indexOf("issues") === 0);
                    let notificationKey = Object.keys(hash).filter(k => k.indexOf("notifications") === 0);
                    let releaseKey = Object.keys(hash).filter(k => k.indexOf("releases") === 0);
                    for (let i = 0; i < issueKey.length; i++) {
                      let issue = issueKey[i];
                      issues.push(hash[issue]);
                    }
                    for (let i = 0; i < notificationKey.length; i++) {
                      let notification = notificationKey[i];
                      notifications.push(hash[notification]);
                    }
                    for (let i = 0; i < releaseKey.length; i++) {
                      let release = releaseKey[i];
                      releases.push(hash[release]);
                    }
                   
                    const results = [];
                    hash.map(h => {
                      for (let key in h) {
                        // console.log(hash[key])
                        if (Array.isArray(h[key]) && h[key].length > 0) {
                          // console.log(hash[key])
                          results.push(h[key])
                        }
                      }
                    })
                    res.send([...results]);
                    // var sepIssues = [];
                    // console.log('TESTICLES', issues)
                    // res.send(issues);
                    // let sortPullFromIssues = sortIssuesFromPullRequests(issues);
                    // const pullInfo = sortPullFromIssues[0];
                    // const issueInfo = sortPullFromIssues[1];
                    // console.log(issues)
                    // console.log('TESTICLES 0', sortPullFromIssues[0])
                    // console.log('TESTICLES 1', sortPullFromIssues[1][1])
                    
                    // for (let i = 0; i < sortPullFromIssues[1].length; i++) {
                    //   let t = sortPullFromIssues[1][i];
                    //   console.log('ALAN', t);
                    //   sepIssues.push(t);
                    // }
                    // console.log('TESTICLES', sepIssues[1]);
                    // const rankedReleases = addRankingToData(releases, 1000, 'release');
                    // const rankedPulls = addRankingToData(pullInfo, 250, 'pull_request');
                    // const rankedIssues = addRankingToData(issueInfo, 150, 'issue');
                    // var finalResults;
                    // var tempResults;
                    // if (notificationKey.length > 0 || notificationKey !== undefined) {
                    //   let rankedNotifications = addRankingToData(notifications, 200, 'notification');
                    //   tempResults = [...rankedPulls, ...rankedIssues, ...rankedReleases, ...rankedNotifications ];
                    //   finalResults = Promise.all(updateRanking(tempResults))
                    // } else {
                    //   tempResults = [...rankedPulls, ...rankedIssues, ...rankedReleases ];
                    //   finalResults = Promise.all(updateRanking(tempResults));
                    // }
                    // return finalResults;
                  }).catch(e => console.error('err in getRepoReleases', e))
                    }).catch(e => console.error('err in getRepoNotifications', e))
    }
  },

  wildcard: {
    get: function(req, res) {
      res.redirect('/');
    }
  }
}
