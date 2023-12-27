const router = require('express').Router();
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const routerSignin = require('./signin');
const routerSignup = require('./signup');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signin', routerSignin);
router.use('/signup', routerSignup);

router.use(auth);

router.use('/users', routerUsers);
router.use('/movies', routerMovies);
router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
