const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }); // connect to mlab for deployment

const repoSchema = mongoose.Schema({
  repoid: { type: Number, unique: true },
  user:  String,
  description: String,
  html_url: String,
  image: String,
  date: Date
});

const userSchema = mongoose.Schema({
  token: String,
  github_id: String,
  email: { type: String, unique: true },
  name: String,
  username: String,
  avatar: String
});

const User = mongoose.model('User', userSchema);
const Repo = mongoose.model('Repo', repoSchema);

module.exports = { User, Repo };