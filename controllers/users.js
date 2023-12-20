const User = require("../models/user");
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const RepetError = require("../errors/RepetError");
const SigninError = require("../errors/SigninError");

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw NotFoundError("Нет пользователя с таким id U/C");
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(
          new ValidationError(
            "Переданы некорректные данные при поиске пользователя."
          )
        );
      }

      return next(
        `Произола ошибка ${err.name} при получении данных пользователя`
      );
    });
};

module.exports = { getProfile };
