const Movie = require('../models/movieSchema');
const {
  CREATED,
} = require('../utils/constants');

const BadRequestError = require('../errors/BadRequest'); // 400
const NotFoundError = require('../errors/NotFound'); // 404
const ConflictError = require('../errors/ConflictError'); // 409

// возвращает все сохранённые текущим  пользователем фильмы
module.exports.getMovieSave = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при сохранении фильма'));
      } else {
        next(err);
      }
    });
};

// создаёт фильм с переданными в теле
module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink: trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Нет такого ID фильма.'));
      } else if (movie.owner.toString() !== req.user._id) {
        next(new ConflictError('Это чужой фильм.'));
      } else {
        Movie.deleteOne(req.params.movieId)
          .then((removedMovie) => res.send(removedMovie))
          .catch((err) => next(err));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при удалении фильма'));
      } else {
        next(err);
      }
    });
};
