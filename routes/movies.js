const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllMoviesByCurrentUser, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getAllMoviesByCurrentUser);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/),
    trailer: Joi.string().required().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/),
    movieId: Joi.number().required(),
  }),
}), createMovie);
router.delete('/movies/movieId', celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
}), deleteMovie);

module.exports = router;
