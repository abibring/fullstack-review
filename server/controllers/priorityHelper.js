module.exports = {
  updatedScore: function (z,t) {
    var u = Math.max(z,rate*t);
    var v = Math.min(z,rate*t);
    return u + Math.log1p(Math.exp(v-u))
  }
}