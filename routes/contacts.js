const controller = require('../controllers');
const router = require('express').Router();
const auth = require('../middleware');

router
  .route('/')
  .post(auth, controller.contacts.post)
  .get(auth, controller.contacts.get)
  .put(auth, controller.contacts.put);

  router
  .route('/:id').delete(controller.contacts.delete);

module.exports = router;
