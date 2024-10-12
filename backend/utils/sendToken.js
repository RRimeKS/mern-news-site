exports.sendToken = async (user, res, statusCode) => {
  const token = await user.getJWToken();

  const cookieOpt = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
  };

  res.status(statusCode).cookie("token", token, cookieOpt).json({ token });
};
