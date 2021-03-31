const controller = require('../controllers');
const router = require('express').Router();
const auth = require('../middleware');

router.get('/', auth, controller.auth.get);
router.post('/', controller.auth.post);

module.exports = router;
