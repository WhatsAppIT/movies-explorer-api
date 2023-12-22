const User = require("../models/user");
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");

const getProfile = (req, res, next) => {
  //const { _id } = req.body;
  //console.log(req);

  User.findById(req.body._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id U/C");
      }
      //console.log(user);
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

      return next(err);
    });
};

const patchUpdateProfile = (req, res, next) => {
  //console.log(req);
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.body._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id U/C");
      }
      console.log(user);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new ValidationError(
            "Переданы некорректные данные при поиске пользователя."
          )
        );
      }

      return next(err);
    });
};

module.exports = { getProfile, patchUpdateProfile };
