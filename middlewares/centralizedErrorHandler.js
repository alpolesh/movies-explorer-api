const { defaultError } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = defaultError.statusCode, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? defaultError.message
        : message,
    });
  next();
};
