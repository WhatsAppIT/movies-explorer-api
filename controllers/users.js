const User = require("../models/user");
//const NotFoundError = require("../errors/NotFoundError");

/* const getProfile = (req, res, next) => {
  User.findById(req.user._id).then((user) => {
    if (!user) {
      throw NotFoundError("Нет пользователя с таким id U/C");
    }

    return res.send(user);
  });

  next();
}; */

const getProfile = (req, res) => {
  const { userName, email } = user;
};

module.exports = { getProfile };
