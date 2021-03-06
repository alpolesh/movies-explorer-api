require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');
const router = require('./routes/index');
const { mongoUrl } = require('./utils/config');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://movies-explorer.alpolesh.nomoredomains.work', 'http://movies-explorer.alpolesh.nomoredomains.work'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(requestLogger);
app.use(helmet());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
});
