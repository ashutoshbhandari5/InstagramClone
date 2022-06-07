const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const generateJwtToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN})
}


exports.createUser = catchAsync(async(req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        email: req.body.email,
        passwordChangedAt: req.body.passwordChangedAt
    })

    //removing password bofore sending information to client
    user.password = undefined;
    user.__v = undefined;
    const token = generateJwtToken(user._id)

    res.status(201).json({
        status:'success',
        token,
        data: {
            user
        }
    })
})

exports.signIn = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new AppError('Please enter your email and password', 402));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new AppError('Cannot find user with this email', 404));
    }

    console.log(user.password)

    const validPassword = await user.isCorrectPassword(password, user.password);

    console.log(validPassword);

    if(!validPassword){
        return next(new AppError('Please enter correct password', 401));
    }
    user.password = undefined;

    const token = generateJwtToken(user._id); 

    res.status(200).json({
        status:"success",
        token,
        data:{
            user
        }
    })

})