const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const generateJwtToken = require("../utils/generateJwt");

exports.createUser = catchAsync(async (req, res, next) => {
  if (!req.body.username) {
    next(new AppError("Please provide username", 401));
  }

  const username = { username: req.body.username };

  const accessToken = generateJwtToken(
    username,
    process.env.JWT_ACCESS_SECRET_KEY,
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
  );

  const refreshToken = generateJwtToken(
    username,
    process.env.JWT_REFRESH_SECRET_KEY,
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
  );
  const user = await User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    refreshToken: [refreshToken],
  });

  if (!user) {
    return next(new AppError("Error while creating user", 400));
  }

  user.password = undefined;
  user.__v = undefined;
  user.refreshToken = undefined;

  res.cookie("jwt", refreshToken, {
    expires: new Date(Date.now() + 24 * 60 * 1000),
    httpOnly: true,
  });
  console.log("Success");
  res.status(201).json({
    status: "success",
    data: {
      user,
      token: accessToken,
    },
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const cookies = req.cookies;

  if (!username || !password) {
    return next(new AppError("Please enter your email and password", 402));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const validPassword = await user.isCorrectPassword(password, user.password);

  if (!validPassword) {
    return next(new AppError("Please enter correct password", 401));
  }
  const accessToken = generateJwtToken(
    username,
    process.env.JWT_ACCESS_SECRET_KEY,
    process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
  );

  const refreshToken = generateJwtToken(
    username,
    process.env.JWT_REFRESH_SECRET_KEY,
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
  );

  let newRefreshTokenArray = cookies?.jwt
    ? user.refreshToken.filter((rt) => rt !== cookies.jwt)
    : user.refreshToken;

  if (cookies?.jwt) {
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken });

    //1 User login and doesn't visit other route and does not logouts
    //2 RT of that user is stolen
    //3 IF both 1 and 2 we need to clear all the tokens

    if (!foundUser) {
      console.log("Reuse of the token detected");
      newRefreshTokenArray = [];
    }
    res.clearCookie("jwt", { httpOnly: true });
  }

  user.refreshToken = [newRefreshTokenArray, refreshToken];

  const result = await user.save({ validateBeforeSave: false });
  result.refreshToken = undefined;

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    status: "success",
    data: {
      result,
      accessToken,
    },
  });
});
