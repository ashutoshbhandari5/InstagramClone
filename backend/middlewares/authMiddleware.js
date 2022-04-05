const {promisify} = require('util');
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

exports.protect = catchAsync( async(req, res, next) => {
    let token;

    console.log(req.headers.authorization);
    //find token in headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
    }else if(req.cookies){
        token = req.cookies.jwt;
    }
    

    //return error message if the token is not available
    if(!token){
        return next(new AppError('User is not authorized', 401));
    }

    //decode the token
    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    
    //check if the user is avilable with that particular token
    const user = await User.findById(decodedToken.id).select('-password');
    console.log(user);
    if(!user){
        return next(new AppError('User does not exits', 404));
    }

    //if password is changed after token is generated user should login again
    const isNotValidToken = user.changedPasswordAfter(decodedToken.iat);
    if(isNotValidToken){
        return next('Please login again', 401);
    }
    req.user = user;
    next();
})