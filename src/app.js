const express = require('express');
const { userRouter, categoryRouter, postRouter } = require('./routes');
const { userController } = require('./controller');
const validateLogin = require('./middlewares/validateLogin');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validateLogin, userController.login);

app.use('/user', userRouter);

app.use('/categories', categoryRouter);

app.use('/post', postRouter);

module.exports = app;
