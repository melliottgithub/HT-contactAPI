const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../database');
//const { users } = require('./users');

const contactSchema = new mongoose.Schema({
  userId: {
    type: ObjectId, //mongoose.Schema.Types.ObjectId,
    refs: 'users',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  phone: {
    type: String,
    // required: true,
    // minLength: 6,
  },
  type: {
    type: String,
    default: 'FullStack',
  },
  company : String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = {
  Model: Contact,
  async createNewContact(data) {
    try {
      const contact = await Contact.create(data);
      return contact;
    } catch (err) {
      console.log('Cannot create ', data, err);
      throw err;
    }
  },
  async getContactsByUser({ userId }) {
    try {
      const contacts = await Contact.find({ userId: ObjectId(userId) }).sort({
        date: -1,
      });
      return contacts;
    } catch (err) {
      // ??
      console.log('Cannot retrieve ', err);
      console.log(err);
    }
  },
  async updateById(contact) {
    try {
      const updated = await Contact.findOneAndUpdate({_id: contact._id}, contact, { new: true });
      return updated;
    } catch (err) {
      // ??
      console.log('Cannot retrieve ', err);
      console.log(err);
    }
  },
  async deleteById(contactId) {
    try {
      const result = await Contact.deleteOne({ _id: ObjectId(contactId) });
      return result.deletedCount == 1;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  
};
