exports.sendToken = async (user, res, statusCode) => {
  const token = await user.getJWToken();

  const cookieOpt = {
    httpOnly: false,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
    secure: true,   // HTTPS üzerinden iletimi zorunlu kılar
    sameSite: 'None', // Cross-site cookie'leri etkinleştirir
    path: '/',
    domain: 'https://turanocaklarii.netlify.app',
  };

  res.status(statusCode).cookie("token", token, cookieOpt).json({ token });
};

// httpOnly: true,
//     expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
//     secure: true,   // HTTPS üzerinden iletimi zorunlu kılar
//     sameSite: 'None', // Cross-site cookie'leri etkinleştirir