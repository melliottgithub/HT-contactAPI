const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

// const Joi = require('joi');

// const validator = Joi.object({
//   password: Joi.string().min(6)
// });
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

const User = mongoose.model('User', userSchema);

module.exports = {
  Model: User,
  async registerUser(data) {
    // const { error } = validator.validate(data);
    // error.isUserError = true;
    // if (error) throw error;
   return await User.create(data);
  },
  async encryptPassword(password) {},
  async authenticate(password) {},
  async getAllUsers(/* pasar la paginations eventualmente */) {
    try {
      const users = await User.find({});
      return users.map((user) => this.getDetails(user));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getDetails(user) {
    const { id, name } = user;
    return {
      id,
      name,
    };
  },
};
