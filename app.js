require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { reqLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const allRoutes = require('./routes/index');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(
  cors({
    origin: [
      'https://bitfilm.nomoredomainsmonster.ru',
      'http://bitfilm.nomoredomainsmonster.ru',
      'http://localhost:3000',
      'https://api.bitfilm.nomoredomainsmonster.ru',
      'http://api.bitfilm.nomoredomainsmonster.ru',
      'http://localhost:3001',
    ],
    credentials: true,
    maxAge: 30,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(reqLogger);

app.use('/', allRoutes);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

async function init() {
  await mongoose.connect(MONGO_URL);
  await app.listen(PORT);
}

init();
