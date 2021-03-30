const { users } = require('../models');
const { auth } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, db } = require('../config');

module.exports = {
  async get(req, res, next) {
    let user = await db.findOne();
    const { email, password } = req.body;
    try {
      if (!user) {
        return res.status(400).json({ status: 'Invalid Credentials' });
      }
      const { id } = user;
      const payload = {
        user: {
          id,
        },
      };
      jwt.sign(
        payload,
        secret.key,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
      const data = await auth.authUser(req.body);
      res.status(201).json({ status: 'Logged in user' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  async post(req, res, next) {
    try {
      const data = await auth.finOneAndUpdate(req.id);
      res.status(200).json({ status: 'Updated contact' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  async delete(req, res, next) {
    try {
      const data = await auth.delete();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
