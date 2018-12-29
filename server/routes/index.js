const router = require('express').Router();
const { login, logout, starred, wildcard } = require('../controllers/index.js');

router.get('/user/signin/callback', login.get);
router.get('/logout', logout.get);
router.get('/user/starred', starred.get);
router.get('/*', wildcard.get);

module.exports = router;
