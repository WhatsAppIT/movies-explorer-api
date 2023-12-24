const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkRegex } = require('../utils/constants');
const {
  getAllSavedMovie,
  postMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getAllSavedMovie);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().integer().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(linkRegex),
      trailerLink: Joi.string().required().regex(linkRegex),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().regex(linkRegex),
      movieId: Joi.number().integer().required(),
      owner: Joi.string().length(24).hex(),
    }),
  }),
  postMovie,
);
router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovieById,
);

module.exports = router;
