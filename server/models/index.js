const { User, Repo, Term } = require('../database');

const saveUser = (user, cb) => {
  let newUser = new User({ github_id: user.id, email: user.email, name: user.name, username: user.login  });
  newUser.save((err) => {
    if (err) {
      cb(err);
    } else {
      cb();
    }
  });
};

const getUser = (username, cb) => {
  User.find({ username }, (err, results) => {
    if (err) {
      console.error('err in getUser:', err);
      cb(err, null);
    } else {
      // console.log('results in getUser:', results);
      cb(null, results);
    }
  });
}

const saved = (term, repos) => {
  repos.body = JSON.parse(repos.body);
  repos.body = [repos.body];
  const searchedTerm = new Term({ term });
  searchedTerm.save(err => {
    if (err) console.error('err in saved for Term:', err);
  })
  repos.body[0].items.map(repo => {
    Repo.insertMany([{
      repoid: repo.id,
      user: repo.user.login, 
      name: repo.title, 
      description: repo.body,
      html_url: repo. html_url,
      image: repo.user.avatar_url,
      date: new Date(repo.created_at)
    }], (err) => {
      if (err) {
        console.error(`error in saved: ${err}`);
      }
    });
  }) 
}

const getInfo = (cb) => {
  Repo.find()
    .limit(100)
    .sort({date: -1})
    .exec(((err, docs) => {
      if (err) {
        console.error(`err in findById: ${err}`)
        cb(err, null);
      } else {
        cb(null, docs)
      }
  }));
}

module.exports = { saved, getInfo, saveUser, getUser };