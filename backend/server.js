const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRouter = require("./routes/userRoutes");
const refreshTokenRoute = require("./routes/refreshTokenRoute");
const cookiePraser = require("cookie-parser");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");
const moment = require("moment");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

app.use(cookiePraser());

connectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/refreshToken", refreshTokenRoute);

app.use("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} in this server`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
