const jwt = require('jsonwebtoken');
const { AuthError } = require('../utils/custom_errors/AuthError');
const { jwtDevKey } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization.slice(7);
  let payload;
  try {
    if (!token) {
      throw new AuthError('Необходима авторизация');
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtDevKey);

    req.user = payload;
    next();
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
};
