const userRouter = require('express').Router();

const { getCurrentUser, updateUserData } = require('../controllers/users');
const { validUserUpdate } = require('../utils/validate');

// Получение пользователя
userRouter.get('/me', getCurrentUser);
// Обновить профиль или аватар
userRouter.patch('/me', validUserUpdate, updateUserData);

module.exports = userRouter;
