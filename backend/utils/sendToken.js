exports.sendToken = async (user, res, statusCode) => {
  const token = await user.getJWToken();

  const cookieOpt = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
    // secure: false,   // HTTPS üzerinden iletimi zorunlu kılar
    sameSite: 'none', // Cross-site cookie'leri etkinleştirir

    domain: 'https://turanocaklarii.netlify.app', // Eğer alt domain kullanıyorsanız doğru yapılandırın
  };

  res.status(statusCode).cookie("token", token, cookieOpt).json({ token });
};
