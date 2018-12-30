const router = require('express').Router();
const { starred, wildcard } = require('../controllers/index.js');
const { login, logout } = require('../controllers/authController.js');

router.get('/user/signin/callback', login.get);
router.get('/logout', logout.get);
router.get('/user/starred', starred.get);
router.get('/*', wildcard.get);
// router.get('/user/collab', collab.get);
// router.get('/user/org', org.get);

module.exports = router;
