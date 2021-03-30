const controller = require('../controllers');
const router = require('express').Router();

router.route('/auth').get(controller.auth.get).post(controller.auth.post);

module.exports = router;
