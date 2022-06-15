const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const AppError = require("../utils/appError");
const generateJwtToken = require("../utils/generateJwt");
const jwt = require("jsonwebtoken");

exports.refreshToken = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) {
    return next(new AppError("Access not allowed", 401));
  }
  res.clearCookie("jwt", { httpOnly: true, secure: true });

  const foundUser = await User.find({ refreshToken: refreshToken });

  //First check if the expired token is reused
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY,
      async (err, decoded) => {
        if (err) {
          return next(new AppError("Access not allowed", 403));
        }
        const user = await User.find({ username: decoded.username });
        user.refreshToken = [];
        await user.save();
      }
    );
    return next(new AppError("Access is not available", 403));
  }

  let refreshTokenArray;
  if (foundUser && foundUser.refreshToken) {
    refreshTokenArray = foundUser.refreshToken.filter(
      (el) => el !== refreshToken
    );
  }

  let decodedToken;
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY,
    async (err, decoded) => {
      if (err) {
        foundUser.refreshToken = [...refreshTokenArray];
        await foundUser.save();
      }
      if (err || foundUser.username !== decoded.username) {
        return next(new AppError("Access denied", 403));
      }
      decodedToken = decoded;
    }
  );
  const username = foundUser.username;
  const newRefreshToken = generateJwtToken(
    { username },
    process.env.JWT_REFRESH_SECRET_KEY,
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
  );
  const newAccessToken = generateJwtToken(
    { username },
    process.env.JWT_ACCESS_SECRET_KEY,
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
  );

  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.status(200).json({ newAccessToken });
});
