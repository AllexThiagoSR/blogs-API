const express = require('express');
const { userRouter } = require('./routes');
const { userController } = require('./controller');
const validateLogin = require('./middlewares/validateLogin');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/users', userRouter);

app.post('/login', validateLogin, userController.login);

module.exports = app;
