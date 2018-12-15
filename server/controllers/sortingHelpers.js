const moment = require('moment');
module.exports = {
  updatedScore: function(z,t) {
    var u = Math.max(z,rate*t);
    var v = Math.min(z,rate*t);
    return u + Math.log1p(Math.exp(v-u))
  },
  isolateData: function(arr) {
    let results = []
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].data && arr[i].data.length > 0) {
        results.push(arr[i].data);
      }
    }
    return results;
  },
  addRankingToData: function(arr, n) {
    if (Array.isArray(arr[0])) {
      arr = arr[0];
    }
    for (let i = 0; i < arr.length; i++) {
      let repo = arr[i];
      repo.ranking =  arr.length-1 * Math.pow((1 - moment(repo.published_at || repo.created_at).valueOf()), n);      
    }
    return arr;
  },
  updateRanking: function(arr) {
    return arr.sort((a, b) => {
      return a.ranking - b.ranking;
    });
  }
}

