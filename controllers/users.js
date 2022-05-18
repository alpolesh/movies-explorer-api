const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NonExistendError } = require('../utils/custom_errors/NonExistendError');
const { ValidationError } = require('../utils/custom_errors/ValidationError');
const { CastError } = require('../utils/custom_errors/CastError');
const { AuthError } = require('../utils/custom_errors/AuthError');
const { ExistendEmailError } = require('../utils/custom_errors/ExistendEmailError');
const { jwtDevKey } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (user === null) {
        return Promise.reject(new NonExistendError('Пользователь не найден'));
      } return res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserProfil = (req, res, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    req.body,
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user === null) {
        return Promise.reject(new NonExistendError('Пользователь не найден'));
      } return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные в методы создания пользователя'));
      } else if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ExistendEmailError('Пользователь с такой почтой уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name, email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные в методы создания пользователя'));
      } else if (err.code === 11000) {
        next(new ExistendEmailError('Пользователь с такой почтой уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : jwtDevKey);
          return res.send({
            message: 'аутентификация прошла успешно',
            data: {
              token,
            },
          });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      next(err);
    });
};
