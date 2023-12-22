require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const { reqLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/NotFoundError");

const { PORT = 3000, MONGO_URL = "mongodb://127.0.0.1:27017/bitfilmsdb" } =
  process.env;

const routerUsers = require("./routes/users");
const routerMovies = require("./routes/movies");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(reqLogger);

app.use(auth);

app.use("/users", routerUsers);
app.use("/movies", routerMovies);
app.use("*", (req, res, next) =>
  next(new NotFoundError("Страница не найдена"))
);
app.use(errorLogger);
//app.use(errors());

app.use(errorHandler);

async function init() {
  await mongoose.connect(MONGO_URL);
  console.log("База данных подключена УСПЕШНО");
  await app.listen(PORT);
  console.log(`Сервер запущен на порту ${PORT}`);
}

init();
