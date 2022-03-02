const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db.js");

dotenv.config({path: "./config.env"});

const app = express();

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})