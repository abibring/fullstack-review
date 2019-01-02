const router = require('express').Router();
const { starred, associated, repoBySearch, search, wildcard } = require('../controllers/index.js');
const { login, logout } = require('../controllers/authController.js');

router.get('/user/signin/callback', login.get);
router.get('/logout', logout.get);
router.get('/user/starred', starred.get);
router.get('/user/associated', associated.get);
router.get('/user/search/repo', repoBySearch.get);
router.post('/user/search', search.post);
router.get('/*', wildcard.get);

module.exports = router;
