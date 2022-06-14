const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const generateJwtToken = (info, secretKey) => {
  return jwt.sign({ ...info }, secretKey, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createUser = catchAsync(async (req, res, next) => {
  if (!req.body.username) {
    next(new AppError("Please provide username", 401));
  }

  const username = { username: req.body.username };

  const accessToken = generateJwtToken(
    username,
    process.env.JWT_ACCESS_SECRET_KEY
  );

  const refreshToken = generateJwtToken(
    username,
    process.env.JWT_ACCESS_SECRET_KEY
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
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter your email and password", 402));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Cannot find user with this email", 404));
  }

  console.log(user.password);

  const validPassword = await user.isCorrectPassword(password, user.password);

  console.log(validPassword);

  if (!validPassword) {
    return next(new AppError("Please enter correct password", 401));
  }
  user.password = undefined;

  const token = generateJwtToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
