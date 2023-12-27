const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getProfile, patchUpdateProfile } = require('../controllers/users');

router.get('/me', getProfile);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    }),
  }),
  patchUpdateProfile,
);

module.exports = router;
