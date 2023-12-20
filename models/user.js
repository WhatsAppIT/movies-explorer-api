const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "минимальная длинна 2 символа"],
      maxlength: [30, "максимальная длинна 30 символов"],
      default: "Имя пользователя",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => isEmail(email),
        message: "Неправильный формат почты",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [8, "В пароле минимум 8 символов"],
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
