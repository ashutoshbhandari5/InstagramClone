const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const {
  generateJwtToken,
  generateAccessAndRefreshTokens,
} = require("../utils/generateJwt");
const { OAuth2Client } = require("google-auth-library");
const { generateFromEmail } = require("unique-username-generator");

exports.createUser = catchAsync(async (req, res, next) => {
  if (!req.body.username) {
    next(new AppError("Please provide username", 401));
  }

  const username = { username: req.body.username };

  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
    { username },
    { username }
  );
  const user = await User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
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
  const { username: emailOrUsername, password } = req.body;
  const cookies = req.cookies;

  if (!emailOrUsername || !password) {
    return next(new AppError("Please enter your username and password", 401));
  }

  const isEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(
    emailOrUsername
  );

  let user;
  if (isEmail) {
    user = await User.findOne({ email: emailOrUsername }).select("+password");
  } else {
    user = await User.findOne({ username: emailOrUsername }).select(
      "+password"
    );
  }

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const validPassword = await user.isCorrectPassword(password, user.password);

  if (!validPassword) {
    return next(new AppError("Please enter correct password", 401));
  }
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
    { username: emailOrUsername },
    { username: emailOrUsername }
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

  user.refreshToken = [...newRefreshTokenArray, refreshToken];

  const result = await user.save({ validateBeforeSave: false });
  result.refreshToken = undefined;

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  result.password = undefined;
  result.refreshToken = undefined;
  res.status(200).json({
    status: "success",
    data: {
      result,
      accessToken,
    },
  });
});

exports.googleLogin = catchAsync(async (req, res, next) => {
  const idToken = req.body.token;
  const cookies = req.cookies;
  const client = new OAuth2Client(
    process.env.GOOGLE_CLINET_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  const userInfo = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLINET_ID,
  });

  if (!userInfo) {
    next(new AppError("Authentication failed", 401));
  }

  //Since there will be some users generate refresh token and access token

  const { email, sub, given_name, family_name } = userInfo.payload;
  const foundUser = await User.findOne({ googleId: sub });

  if (foundUser) {
    console.log("User found");
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
      { email: foundUser.email, username: foundUser.username },
      { email: foundUser.email }
    );

    let newRefreshTokenArray = cookies?.jwt
      ? foundUser.refreshToken.filter((rt) => rt !== cookies.jwt)
      : foundUser.refreshToken;
    if (cookies?.jwt) {
      const cRefreshToken = cookies.jwt;
      const getUser = await User.find({ refreshToken: cRefreshToken });

      if (!getUser) {
        newRefreshTokenArray = [];
        console.log("reuse of the token detected ===>>> Stolen token");
      }
      res.clearCookie("jwt", { httpOnly: true });
    }

    const refreshTokenArray = [...newRefreshTokenArray, refreshToken];

    foundUser.refreshToken = refreshTokenArray;

    const result = await foundUser.save({ validateBeforeSave: false });
    result.password = undefined;
    result.refreshToken = undefined;
    result.__v = undefined;

    console.log(accessToken);
    console.log("======================");
    console.log(refreshToken);

    return res
      .status(200)
      .cookie("jwt", refreshToken, { httpOnly: true })
      .json({
        status: "sccuess",
        data: {
          result,
          accessToken,
        },
      });
  }

  console.log(email);
  const existingUserEmail = await User.findOne({ email });
  if (existingUserEmail) {
    console.log("User's email already exists");
    next(
      new AppError(
        "This user email already exists, please login with another email",
        400
      )
    );
  }

  const username = generateFromEmail(email, 1);
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
    { email, username },
    { email }
  );

  if (cookies) {
    res.clearCookie("jwt", { httpOnly: true });
  }

  const createUser = new User({
    name: `${given_name} ${family_name}`,
    email,
    googleId: sub,
    username,
    refreshToken: [refreshToken],
  });

  const newUser = await createUser.save({ validateBeforeSave: false });

  newUser.refreshToken = undefined;
  newUser.googleId = undefined;
  newUser.password = undefined;

  res
    .status(201)
    .cookie("jwt", refreshToken, { httpOnly: true })
    .json({
      status: "success",
      data: {
        user: newUser,
        accessToken,
      },
    });
});

exports.logout = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) {
    return next(new AppError("Refresh Token not available", 403));
  }

  console.log(refreshToken);
  const decodedRefreshToken = await jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY
  );

  if (!decodedRefreshToken) {
    return next(new AppError("Refresh Token Expired", 403));
  }

  const foundUser = await User.find({ refreshToken });

  if (!foundUser) {
    return res.clearCookie("jwt", { httpOnly: "true" }).status(204);
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  foundUser.refreshToken = newRefreshTokenArray;
  await foundUser.save({ validateBeforeSave: false });
  res.status(200).clearCookie("jwt", { httpOnly: true });
});
