exports.sendToken = async (user, res, statusCode) => {
  const token = await user.getJWToken();

  const cookieOpt = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
    httpOnly: true,
    secure: true, // HTTPS kullanıyorsanız true olmalı
    sameSite: 'None',
  };

  res.status(statusCode).cookie("token", token, cookieOpt).json({ token });
};

// httpOnly: true,
//     expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
//     secure: true,   // HTTPS üzerinden iletimi zorunlu kılar
//     sameSite: 'None', // Cross-site cookie'leri etkinleştirir