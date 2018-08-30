const mongoose = require('mongoose');
mongoose.connect('mongodb://alon:alon11@ds237932.mlab.com:37932/fullstack-review'); // connect to mlab for deployment

let repoSchema = mongoose.Schema({
  repoid: { 
    type: Number, unique: true 
  },
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
    console.log(repo.id)
    Repo.insertMany([{
      repoid: repo.id,
      user: repo.owner.login, 
      name: repo.name, 
      stargazers: repo.stargazers_count, 
      size: repo.size,
      description: repo.description,
      url: repo.html_url  
    }], err => {
      if (err) {
        console.error(`error in saved: ${err}`)
      }
    });
  })
  
}

// need to make a get/receive function here:

let getInfo = (cb) => {
  Repo.find()
  .limit(25)
  .sort({ stargazers: -1})
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