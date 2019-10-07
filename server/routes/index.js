const router = require('express').Router();
const wildcardController = require('../controllers/wildcardController.js');
const associatedController = require('../controllers/associatedController.js');
const starredController = require('../controllers/starredController.js');
const repoController = require('../controllers/repoController.js');
const searchController = require('../controllers/searchController.js');
const { login, logout } = require('../controllers/authController.js');

router.get('/user/signin/callback', login.get);
router.get('/logout', logout.get);
router.get('/user/starred', starredController.get);
router.get('/user/associated', associatedController.get);
router.get('/user/search/repo', repoController.getRepoBySearch);
router.put('/user/add/starred', repoController.addRepo);
router.post('/user/search', searchController.post);
router.get('/*', wildcardController.get);

module.exports = router;
