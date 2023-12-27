const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { postUser } = require('../controllers/users');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  postUser,
);

module.exports = router;
