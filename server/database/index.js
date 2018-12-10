const mongoose = require('mongoose');
require('dotenv').config();
console.log('XXXX,', process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }); // connect to mlab for deployment

const repoSchema = mongoose.Schema({
  repoid: { type: Number, unique: true },
  user:  String,
  description: String,
  html_url: String,
  image: String,
  date: Date
});

const termSchema = mongoose.Schema({
  term: { type: String, unique: true },
});

const userSchema = mongoose.Schema({
  token: String,
  github_id: String,
  email: { type: String, unique: true },
  name: String,
  username: String,
});

const User = mongoose.model('User', userSchema);
const Term = mongoose.model('Term', termSchema);
const Repo = mongoose.model('Repo', repoSchema);

module.exports = { User, Term, Repo };