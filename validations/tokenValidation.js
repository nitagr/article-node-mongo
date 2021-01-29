/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  let token = req.get('authorization');
  if (token) {
    token = token.slice(7);
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ status: 400, message: 'Invalid Token' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({ status: 403, message: 'unauthorised user' });
  }
};

module.exports = { checkToken };
