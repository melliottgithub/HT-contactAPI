const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = (req, res, next) => {
  console.log('req.headers', req.headers);
  const token = req.headers['authorization'];
  console.log('token', token);

  if (!token) {
    return res.status(403).json({ Status: 'Authorization denied. No token.' });
  }

  try {
    console.log('testtttttttttttttt')
    const decoded = jwt.verify(token, secret.key);
    req.user = decoded.user;
    console.log('user', decoded.user);
    next();
  } catch (err) {
    res.status(401).json({ status: 'Token is not valid' });
  }
};
