const { users } = require('../models');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

//crud
module.exports = {
  async post(req, res, next) {
    const { name, email, password , passwordConfirm } = req.body;
    try {
      let user = await users.Model.findOne({ email });

      if (user) {
        return res.status(500).json({ message: 'User already exists' });
      }
      //
      if (password !== passwordConfirm) {
        return res.status(500).json({ message: 'Password does not match' });
      }
      user = await users.registerUser({ name, email, password });
      const { id } = user;
      const payload = {
        user: {
          id,
        },
      };
      jwt.sign(payload, secret.key, { expiresIn: 360000 }, (err, token) => {
        if (err) {
          console.log(err);
          throw err;
        }
        return res.status(200).json({ token });
      });


    } catch (err) {

      if (err.name == 'MongoError' && err.code === 11000) {
        if ('email' in err.keyPattern) {
          return res.status(400).json({ error : 'Email address is already registered' });
        } else {
          return res.status(400).json({ error : 'Duplicate Key' });
        }
      }
      res.status(500).json({ error : err });
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
