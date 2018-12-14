module.exports = {
  updatedScore: function (z,t) {
    var u = Math.max(z,rate*t);
    var v = Math.min(z,rate*t);
    return u + Math.log1p(Math.exp(v-u))
  },
  sortByDate: function(a, b) {
    return new Date(b.updated_at || b.published_at) - new Date(a.updated_at || a.published_at);
  }
}

