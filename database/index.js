const mongoose = require('mongoose');
const Config = require('../config');

function connect () {
  return mongoose.connect(Config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
  });
}

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('We are connected on MongoDB');
// });


// const Contact = mongoose.model('Contact', contactSchema);
// const Auth = mongoose.model('Auth', userSchema);

module.exports = {
  connect,
  // Contact,
  // Auth,
};
