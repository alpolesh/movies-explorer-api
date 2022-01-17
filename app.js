const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');

const { NotFoundError } = require('./utils/custom_errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(requestLogger);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/movies'));

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.listen(PORT, () => {
});
