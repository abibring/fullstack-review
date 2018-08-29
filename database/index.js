const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher'); // connect to mlab for deployment

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  owner:  {
    login: String
  },
  name: String,
  stargazers: Number,
  size: Number,
  description: String,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

// let save = (repos) => {
//   // TODO: Your code here
//   // This function should save a repo or repos to
//   // the MongoDB
//   // console.log(repos, 'BALLS')
//   repos.map(repo => {
//     repo.save(err => {
//       console.error(`err in save: ${err}`);
//     })
//   })
  
// }

let saved = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log(typeof repos.body)
  repos.body = JSON.parse(repos.body);
  // console.log(Array.isArray(repos.body))
  // console.log(typeof repos.body)
  repos.body.map(repo => {
    // Repo.save({ 
    //   owner: { login: repo.login }, 
    //   name: repo.name, 
    //   stargazers: repo.stargazers_count, 
    //   size: repo.size,
    //   description: repo.description,
    //   url: repo.url  
    // });
    repo.save((err) => console.error(`err in save: ${err}`))
  })
  
}

// need to make a get/receive function here:


module.exports.saved = saved;

// put in server.js