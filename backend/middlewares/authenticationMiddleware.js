const jsonwebtoken = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/User.models");

const isAuthenticated = async (req, res, next) => {
  const { token } = req?.cookies;
  console.log(token);

  if (!token) return next(new ErrorHandler("Lütfen Giriş Yapınız.", 400));

  const decodedData = jsonwebtoken.decode(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedData?.id);
  next();
};

const checkedRole = (...roles) => {
    return (req,  res, next) => {
        if (!roles.includes(req?.user?.role)) {
            return next(new ErrorHandler("Yetki Dışı İşlem!", 400));
        }
        next();
    }
}

module.exports = { isAuthenticated, checkedRole };
