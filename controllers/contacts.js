const { contacts } = require('../models');

module.exports = {
  async post(req, res, next) {
    try {
      const data = await contacts.create(req.body);
      res.status(201).json({ status: 'New contact created' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  async put(req, res, next) {
    try {
      const data = await contacts.finOneAndUpdate(req.id);
      res.status(200).json({ status: 'Updated contact' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  async delete(req, res, next) {
    try {
      const data = await contacts.delete();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
