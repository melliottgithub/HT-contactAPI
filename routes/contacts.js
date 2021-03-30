const controller = require('../controllers');
const router = require('express').Router();

router.route('/contacts').post(controller.contacts.post);
// router
//   .route('/contacts/:id')
//   .put(controller.contacts.put)
//   .delete(controller.contacts.delete);

module.exports = router;
