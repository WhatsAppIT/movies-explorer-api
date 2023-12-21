require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { PORT = 3000, MONGO_URL = "mongodb://127.0.0.1:27017/bitfilmsdb" } =
  process.env;

const routerUsers = require("./routes/users");
const routerMovies = require("./routes/movies");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", routerUsers);
app.use("/movies", routerMovies);

async function init() {
  await mongoose.connect(MONGO_URL);
  console.log("База данных подключена УСПЕШНО");
  await app.listen(PORT);
  console.log(`Сервер запущен на порту ${PORT}`);
}

init();
