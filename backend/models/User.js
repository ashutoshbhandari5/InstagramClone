const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide your valid email"]
    },
    photo:String,
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type:String,
        required: [true, "Please confirm your password"],
        minlength: 8,
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: "Password does not match"
        }
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;