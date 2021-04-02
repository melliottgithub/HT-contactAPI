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
      console.log('users post ', req.body);
      user = await users.registerUser({ name, email, password });
      console.log('user', user);
      const { id } = user;
      const payload = {
        user: {
          id,
        },
      };
      console.log('payload', payload);
      jwt.sign(payload, secret.key, { expiresIn: 360000 }, (err, token) => {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log('token', token)
        return res.status(200).json({ token });
      });


    } catch (err) {

      if (err.name == 'MongoError' && err.code === 11000) {
        if ('email' in err.keyPattern) {
          throw new Error('Email address is already registered');
        } else {
          throw new Error('Duplicated key');
        }
      }
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
