const router = require('express').Router();
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');
const { createUser, login } = require('../controllers/users');
const { validLogin, validCreateUser } = require('../utils/validate');

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.post('/signin', validLogin, login);
router.post('/signup', validCreateUser, createUser);
router.use('*', (req, res, next) => {
  next(new NotFound('404: Страница не найдена.'));
});

module.exports = router;
