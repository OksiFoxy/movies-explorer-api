const movieRouter = require('express').Router();

const {
  getMovieSave, createMovie, deleteMovie,
} = require('../controllers/movie');
const { validNewMovie, validMovieId } = require('../utils/validate');

movieRouter.get('/', getMovieSave);
// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer,
// nameRU, nameEN и thumbnail, movieId
movieRouter.post('/', validNewMovie, createMovie);
// удаляет сохранённый фильм по id
movieRouter.delete('/:movieId', validMovieId, deleteMovie);

module.exports = movieRouter;
