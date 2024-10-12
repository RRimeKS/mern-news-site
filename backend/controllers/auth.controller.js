const User = require("../models/User.models");

const CatchAsyncHandler = require("../middlewares/CatchAsyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendToken");
const APIFilter = require("../utils/ApiFilter");
const { findByIdAndDelete, findById } = require("../models/News.models");
const bcrypt = require("bcryptjs");

exports.login = CatchAsyncHandler(async (req, res, next) => {
  const { email, password } = req?.body;
  let user = await User.findOne({ email });

  if (!user)
    return next(
      new ErrorHandler(
        "Bu eposta adresi ile kayıtlı kullanıcı bulunamadı.",
        404
      )
    );

  const match = await user.comparePassword(password);

  if (!match) return next(new ErrorHandler("E-posta ya da Parola hatalı", 400));

  sendToken(user, res, 200);
});
exports.logout = CatchAsyncHandler(async (req, res, next) => {
  const cookieOpt = {
    httpOnly: true,
    expires: new Date(Date.now())
  }

  res.status(200).cookie("token", null, cookieOpt).json({message: "Çıkış Yapıldı"});
});
//ADMIN
exports.me = CatchAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select("-password");
  if (!user) return next(new ErrorHandler("kullanıcı bulunamadı.", 404));

  res.status(200).json({ user });
});
exports.register = CatchAsyncHandler(async (req, res, next) => {
  const { fullname, email, password } = req?.body;
  let user = await User.findOne({ email: email });

  if (user)
    return next(
      new ErrorHandler("Bu eposta adresi ile kayıtlı kullanıcı mevcut.", 400)
    );
  user = await User.create({ fullname, email, password });
  res.status(200).json({ message: "Kullanıcı oluşturuldu", user });
});
exports.getAllUser = CatchAsyncHandler(async (req, res, next) => {
  const resPerPage = 10;
  const page = Number(req?.query?.page) || 1;
  const skip = resPerPage * (page - 1);
  let totalCount = await User.countDocuments();

  let apiFilter = new APIFilter(
    User.find().skip(skip).limit(resPerPage),
    req?.query
  ).search();
  let users = await apiFilter.query;

  res.status(200).json({ totalCount, users });
});
exports.getUserDetails = CatchAsyncHandler(async (req, res, next) => {
  const {id} = req?.params;

  let user = await User.findById(id);
  if (!user) return next(new ErrorHandler("kullanıcı bulunamadı.", 404));
  
  res.status(200).json({user});
});
exports.deleteUser = CatchAsyncHandler(async (req, res, next) => {
  const { id } = req?.params;
  console.log(id);
  let user = await User.findById(id);
  if (!user) return next(new ErrorHandler("kullanıcı bulunamadı.", 404));

  user = await User.findByIdAndDelete(id);
  res.status(200).json({ message: "Kullanıcı Silindi.", user });
});
exports.updateUser = CatchAsyncHandler(async (req, res, next) => {
  const { id } = req?.params;
  const { fullname, role, email, password } = req?.body;

  let user = await User.findById(id);
  if (!user) return next(new ErrorHandler("kullanıcı bulunamadı.", 404));

  if (password !== undefined) {
    hashedPass = await bcrypt.hash(password, 10)
    user = await User.findByIdAndUpdate(id, { fullname, role, email, password: hashedPass });
  }else {
    user = await User.findByIdAndUpdate(id, { fullname, role, email });
  }
 
  res.status(200).json({ message: "Kullanıcı Güncellendi.", user });
});
