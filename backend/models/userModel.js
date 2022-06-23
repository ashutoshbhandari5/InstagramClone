const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Please enter your username"],
    },
    email: {
      type: String,
      unique: [true, "This email address is already used"],
      sparse: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide valid email address"],
    },
    photo: String,
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      minlength: 8,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password does not match",
      },
    },
    passwordChangedAt: Date,
    refreshToken: [String],
    googleId: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  //do not run the middleware if the password in not changed
  if (!this.isModified("password")) return next();

  //store secure password in database
  this.password = await bcrypt.hash(this.password, 12);

  //remove the confirm password filed as password is already stored in db after hashed
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.isCorrectPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimeStamp < passwordChangedTimeStamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
