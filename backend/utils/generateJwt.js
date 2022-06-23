const jwt = require("jsonwebtoken");

const generateJwtToken = (info, secret, expiresIn) => {
  return jwt.sign({ ...info }, secret, {
    expiresIn,
  });
};

exports.generateAccessAndRefreshTokens = (
  accessTokenInfo,
  refreshTokenInfo
) => {
  const accessToken = generateJwtToken(
    accessTokenInfo,
    process.env.JWT_ACCESS_SECRET_KEY,
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
  );

  const refreshToken = generateJwtToken(
    refreshTokenInfo,
    process.env.JWT_REFRESH_SECRET_KEY,
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
  );

  return { accessToken, refreshToken };
};
