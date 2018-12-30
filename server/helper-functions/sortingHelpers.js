module.exports = {

  createArrayOfStarredRepoNameAndOwners: function(array) {
    return array.map(repo => ({ repo: repo.name, owner: repo.owner.login }));
  },

  isolateData: function(arr) {
    let results = [];
    for (var i = 0; i < arr.length; i++) {
      let repo = arr[i];
      if (repo.data && repo.data.length > 0) {
        results.push(repo.data);
      }
    }
    return results[0];
  },

  isolateData2: function(arr) {
    let results = [];
    for (let i = 0; i < arr.length; i++) {
      let repo = arr[i];
      if (repo.data.length > 0 && (repo.data !== undefined ||  repo.data !== 'undefined')) {
        results.push(repo.data);
      }
    }
    return results;
  },

  addRankingToData: function(arr, n, type) {
    for (let i = 0; i < arr.length; i++) {
      const repo = arr[i];
      const now = new Date();
      let secondsPast;
      if (type === 'release') {
        const publishedAt = new Date(repo.published_at);
        secondsPast = (now.getTime() - publishedAt.getTime());
      } else if (type === 'issue') {
        const updatedAt = new Date(repo.updated_at);
        secondsPast = (now.getTime() - updatedAt.getTime());
      } else if (type === 'notification') {
        const createdAt = new Date(repo.created_at);
        secondsPast = (now.getTime() - createdAt.getTime());
      } else if (type === 'pull_request') {
        const createdAtPR = new Date(repo.created_at);
        secondsPast = (now.getTime() - createdAtPR.getTime());
      }
      repo.ranking = (n * Math.pow(1 / secondsPast, 2));
    }
    return arr;
  },

  updateRanking: function(arr) {
    return arr.sort((a, b) => {
      if (b.ranking - a.ranking === 0) {
         return b.published_at || b.created_at - a.published_at || a.created_at;
      } else {
        return b.ranking - a.ranking;
      }
    });
  }, 

  getDataForStarredRepos: function(array, userToken, cb) {
    return array.map(repo => cb(repo.owner, repo.repo, userToken));
  },

  getDataForOwnedRepos: function(array, userToken, cb) {
    return array.map(repo => cb(repo.owner.login, repo.name, userToken));
  },

  sortIssuesFromPullRequests: function(arr) {
    const pullRepos = [];
    const issueRepos = [];
    arr.map(repo => {
      if (repo.pull_request) {
        pullRepos.push(repo);
      } else {
        issueRepos.push(repo);
      }
    });
    return [pullRepos, issueRepos];
  }
}

