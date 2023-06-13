const express = require('express');
const { userRouter, categoryRouter } = require('./routes');
const { userController } = require('./controller');
const validateLogin = require('./middlewares/validateLogin');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/user', userRouter);

app.use('/categories', categoryRouter);

app.post('/login', validateLogin, userController.login);

module.exports = app;
