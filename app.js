require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000, MONGO_URL = "mongodb://127.0.0.1:27017/bitfilmsdb" } =
  process.env;

const routerUsers = require("./routes/users");

const app = express();

app.use("/users", routerUsers);

async function init() {
  await mongoose.connect(MONGO_URL);
  console.log("База данных подключена УСПЕШНО");
  await app.listen(PORT);
  console.log(`Сервер запущен на порту ${PORT}`);
}

init();
