const { users } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, db } = require('../config');
const auth = require('../middleware');

module.exports = {
  async get(req, res, next) {
    try {
      const user = await users.Model.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.log('err', err);
      res.status(500).json({ status: 'Server Error' });
    }
  },
  async post(req, res, next) {
    const { email, password } = req.body;
    console.log({ email, password });
    let user = await users.Model.findOne({ email });
    try {
      if (!user) {
        res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const { id } = user;
      const payload = {
        user: {
          id,
        },
      };
      jwt.sign(payload, secret.key, { expiresIn: 36000 }, (err, token) => {
        if (err) {
          throw err;
        }
        return res.json({ token });
      });
      // res.status(200).json({ status: 'Updated contact' });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
  async delete(req, res, next) {
    try {
      const data = await users.delete();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
