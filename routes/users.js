const controller = require('../controllers');
const router = require('express').Router();
const auth = require('../middleware');

router.route('/').post(controller.users.post)
.get(auth, controller.users.get);

module.exports = router;
