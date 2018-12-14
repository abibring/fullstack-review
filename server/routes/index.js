const router = require('express').Router();
const { login, logout, events, watching, starred, notifications, issues, repos, wildcard, associated, feed } = require('../controllers/index.js');

router.get('/user/signin/callback', login.get);
router.get('/logout', logout.get);
router.get('/user/events', events.get);
router.get('/user/watching', watching.get);
router.get('/user/starred', starred.get);
router.get('/user/notifications', notifications.get);
router.get('/user/associated', associated.get)
router.get('/user/issues', issues.get);
router.get('/repos', repos.get);
router.get('/user/feed', feed.get);
router.get('/*', wildcard.get);


module.exports = router;
