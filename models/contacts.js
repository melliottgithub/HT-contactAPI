const Contact = require('../database');


module.exports = {
  async createNewContact(data) {
    try {
      const data = await Contact.create(data);
    } catch (err) {
      console.log('Cannot create ', data, err);
      throw err;
    }
  },
  async getAllUsers() {
    try {
      const user = await Contact.find({});
      return user;
    } catch (err) { // ??
      console.log('Cannot retrieve ', err);
      console.log(err);
    }
  },
};
