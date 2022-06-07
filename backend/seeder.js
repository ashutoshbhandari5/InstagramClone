const  mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require("./config/db.js");
const users = require('./dev-data/data/users.json');
const User = require("./models/userModel");
dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
}
importData();