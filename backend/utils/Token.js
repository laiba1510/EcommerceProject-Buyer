const cookieTokenization = (user, statusCode, res) => {
  const token = user.setJWT();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Set the cookie with the key "tokenValue" instead of "token"
  res.status(statusCode).cookie("tokenValue", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = cookieTokenization;
