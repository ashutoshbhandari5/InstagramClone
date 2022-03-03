const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db.js");
const userRouter = require("./routes/userRoutes");

dotenv.config({path: "./config.env"});

const app = express();

connectDB();

app.use('/api/v1/users', userRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})