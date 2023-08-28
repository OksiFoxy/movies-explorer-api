const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректная ссылка на картинку',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректная ссылка на трейлер',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректная ссылка на постер',
    },
  },
  // _id пользователя, который сохранил фильм.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer.
  movieId: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => Number.isInteger(value) && value >= 0,
      message: 'Тут должно быть положительное число',
    },
  },
  // название фильма на русском языке. Обязательное поле-строка.
  nameRU: {
    type: String,
    required: true,
  },
  // название фильма на английском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
