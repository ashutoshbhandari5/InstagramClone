const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const {
  generateJwtToken,
  generateAccessAndRefreshTokens,
} = require("../utils/generateJwt");
const { OAuth2Client } = require("google-auth-library");
const {
  generateFromEmail,
  generateUsername,
} = require("unique-username-generator");

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
    return next(new AppError("Please enter your username and password", 401));
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

  console.log(userInfo);

  //Since there will be some users generate refresh token and access token

  const { email, sub, given_name, family_name } = userInfo;

  const foundUser = await User.find({
    $and: [{ email: { $eq: email } }, { githubId: { $eq: sub } }],
  });

  if (foundUser) {
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
      { email: foundUser.email, username: foundUser.username },
      { email: foundUser.email }
    );

    let newRefreshTokenArray = cookies?.jwt
      ? foundUser.refreshToken((rt) => rt !== cookies.jwt)
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

    const refreshTokenArray = [newRefreshTokenArray, refreshToken];

    foundUser.refreshToken = refreshTokenArray;

    const result = await foundUser
      .save({ validateBeforeSave: false })
      .select("-password -refreshToken");

    res.status(200).cookie("jwt", refreshToken, { httpOnly: true }).json({
      status: "sccuess",
      data: {
        result,
        accessToken,
      },
    });
  }

  const existingUserEmail = await User.find({ email });
  if (existingUserEmail) {
    next(
      new AppError(
        "This user email already exists, please login with another email",
        403
      )
    );
  }

  const username = generateFromEmail(email, 2);
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
    { email, username },
    { email }
  );

  if (cookies) {
    res.clearCookie("jwt", { httpOnly: true });
  }

  const newUser = await User.create(
    {
      name: `${given_name} ${family_name}`,
      email,
      githubId: sub,
      username,
      refreshToken: [refreshToken],
    },
    { validateBeforeSave: false }
  );

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
