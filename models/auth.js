const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
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

const Auth = mongoose.model('Auth', authSchema);

module.exports = {
  async authUser() {
    try {
      const data = await Auth.create();
    } catch (err) {
      console.log(err);
    }
  },
  async getAllUsers() {
    try {
      const user = await Auth.find({});
      callback(user);
    } catch (err) {
      console.log(err);
    }
  },
};
