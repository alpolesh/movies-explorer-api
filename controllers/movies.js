const Movie = require('../models/movie');
const { NonExistendError } = require('../utils/custom_errors/NonExistendError');
const { ValidationError } = require('../utils/custom_errors/ValidationError');
const { CastError } = require('../utils/custom_errors/CastError');

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные в методы создания фильма'));
      } else if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getAllMoviesByCurrentUser = (req, res, next) => {
  const currentUserId = req.user._id;
  Movie.find({ owner: currentUserId })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.body;
  Movie.findByIdAndRemove(movieId)
    .then((movieForRemove) => {
      if (movieForRemove === null) {
        return Promise.reject(new NonExistendError('Фильм не найден'));
      }
      return res.send({ data: movieForRemove });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};