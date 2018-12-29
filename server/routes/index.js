const router = require('express').Router();
const { starred, wildcard, collab, org } = require('../controllers/index.js');
const { login, logout } = require('../controllers/authController.js');
router.get('/user/signin/callback', login.get);
router.get('/logout', logout.get);
router.get('/user/starred', starred.get);
router.get('/user/collab', collab.get);
router.get('/user/org', org.get);
router.get('/*', wildcard.get);

module.exports = router;
