const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const BadRequestError = require('../errors/BadRequest'); // 400
const NotFoundError = require('../errors/NotFound'); // 404
const ConflictError = require('../errors/ConflictError'); // 409
const {
  CREATED,
  SECRET,
} = require('../utils/constants');

// Получение пользователя
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные пользователя'));
      } else {
        console.log('консоль лог получение');
        next(err);
      }
    });
};

// Обновление профиля пользователя
module.exports.updateUserData = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные пользователя'));
      } else {
        console.log('консоль лог апдейт юзер');
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные пользователя'));
      } else {
        console.log('консоль лог логин');
        next(err);
      }
    });
};

// Создание пользователя (Регистрация)
module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const userNoPassword = user.toObject();
      delete userNoPassword.password;
      res.status(CREATED).send(userNoPassword);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      } else {
        console.log('консоль лог регистрация');
        next(err);
      }
    });
};
