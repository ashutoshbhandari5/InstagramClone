const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiFeature = require('../utils/apiFeatures');
const User = require('../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const features = new ApiFeature(User.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    
    const users = await features.query;

    res.status(200).json({
        status:"success",
        results:users.length,
        data:{
            data:users
        }
    })
})