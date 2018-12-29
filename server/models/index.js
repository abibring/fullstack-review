const { User } = require('../database');

const saveUser = (user, cb) => {
  const newUser = new User({ 
    github_id: user.id, 
    email: user.email, 
    name: user.name, 
    username: user.login,
    avatar: user.avatar_url
  });
  newUser.save((err) => cb(err));
};

const getUser = (username, cb) => {
  User.find({ username }, (err, results) => {
    if (err) {
      console.error('err in User.find:', err);
      cb(err, null);
    } else {
      // console.log('results in getUser:', results);
      cb(null, results);
    }
  });
}

module.exports = { saveUser, getUser };