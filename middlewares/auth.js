const jwt = require("jsonwebtoken");
const SigninError = require("../errors/SigninError");

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new SigninError("Необходима авторизация 777888");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    return next(new SigninError("Необходима авторизация 888"));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
