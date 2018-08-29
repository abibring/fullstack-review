const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher'); // connect to mlab for deployment

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  user:  String,
  stargazers: Number,
  size: Number,
  description: String,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let saved = (repos) => {
  repos.body = JSON.parse(repos.body);
  repos.body.map(repo => {
    Repo.insertMany([{
      user: repo.owner.login, 
      name: repo.name, 
      stargazers: repo.stargazers_count, 
      size: repo.size,
      description: repo.description,
      url: repo.url  
    }], err => {
      if (err) {
        console.error(`EEEEEEEEE: ${err}`)
      }
    });
  })
  
}

// need to make a get/receive function here:

let getInfo = (cb) => {
  Repo.find()
  .limit(25)
  .sort({ stargazers: 1})
  .exec(((err, docs) => {
    if (err, null) {
      console.error(`err in findById: ${err}`)
      cb(err);
    } else {
      cb(null, docs);
    }
  }))


}


module.exports = { saved, getInfo };

// put in server.js