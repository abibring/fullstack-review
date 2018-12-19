const moment = require('moment');
module.exports = {
  createArrayOfStarredRepoNameAndOwners: function(array) {
    return array.map(repo => ({ repo: repo.name, owner: repo.owner.login }));
  },
  updatedScore: function(z,t) {
    var u = Math.max(z,rate*t);
    var v = Math.min(z,rate*t);
    return u + Math.log1p(Math.exp(v-u));
  },
  isolateData: function(arr) {
    let results = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].data && arr[i].data.length > 0) {
        results.push(arr[i].data);
      }
    }
    return results;
  },
  addRankingToData: function(arr, n, type) {
    if (Array.isArray(arr[0])) {
      arr = arr[0];
    }

    for (let i = 0; i < arr.length; i++) {
      let repo = arr[i];
      let rankingBasedOnTime;
      let secondsPast;
      const now = new Date();
      if (type === 'release') {
        let publishedAt = new Date(repo.published_at);
        secondsPast = (now.getTime() - publishedAt.getTime()) / 1000;
      } else if (type === 'issue') {
        let updatedAt = new Date(repo.updated_at);
        secondsPast = (now.getTime() - updatedAt.getTime()) / 1000;
      } else if (type === 'notification') {
        let createdAt = new Date(repo.created_at);
        secondsPast = (now.getTime() - createdAt.getTime()) / 1000;
      }
      if (secondsPast < 216000) {
        rankingBasedOnTime = 100;
      } else if (secondsPast < 5184000) {
        rankingBasedOnTime = 95;
      } else if (secondsPast < 5184000 * 7) {
        rankingBasedOnTime = 60;
      } else if (secondsPast < 5184000 * 14) {
        rankingBasedOnTime = 45;
      } else if (secondsPast < 5184000 * 30) {
        rankingBasedOnTime = 30;
      } else if (secondsPast < 5184000 * 60) {
        rankingBasedOnTime = 20;
      } else {
        rankingBasedOnTime = 10;
      }
      repo.ranking = n * rankingBasedOnTime/1000;
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
  }
}

