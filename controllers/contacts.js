const { users } = require('../models');
const { contacts } = require('../models');

module.exports = {
  async post(req, res, next) {
    try {
      const data = { ...req.body, userId: req.user.id };
      await contacts.createNewContact(data);
      res.status(201).json({ status: 'New contact created' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  async get(req, res, next) {
    try {
      const data = await contacts.getContactsByUser({ userId: req.user.id });
      res.json(data);
    } catch (err) {
      res.status(500).json({ status: 'Server Error', error: err });
    }
  },
  async put(req, res, next) {
    const body = req.body;
    try {
      const data = await contacts.updateById(body);
      res.status(200).json({ status: 'Updated contact' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  async delete(req, res, next) {
    try {
      const success = await contacts.deleteById(req.params.id);
      if (success) {
        res.status(200).json({ status: 'Deleteds contact' });
      } else {
        res.status(402).json({ error: 'Not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
