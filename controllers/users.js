const { users } = require('../models');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

//crud
module.exports = {
  async post(req, res, next) {
    const { name, email, password } = req.body;
    try {
      let user = await users.Model.findOne({ email });

      if (user) {
        res.json({ message: 'User already exists' });
      }
      // user = new User({ name, email, password });
      user = await users.registerUser({ name, email, password });

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

      // user = await user.save();
      // return users.getDetails(user);
    } catch (err) {
      if (err.name == 'MongoError' && err.code === 11000) {
        // duplicated key
        if ('email' in err.keyPattern) {
          throw new Error('Email address is already registered');
        } else {
          throw new Error('Duplicated key');
        }
      }
      console.log(err);
      throw err;
    }
  },
  async get(req, res, next) {
    try {
      const data = await users.getAllUsers();
      res.status(200).json({ status: 'success', data });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
