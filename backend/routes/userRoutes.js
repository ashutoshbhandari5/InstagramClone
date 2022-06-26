const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/createUser", authController.createUser);
router.post("/signin", authController.signIn);
router.post("/googleLogin", authController.googleLogin);
router.post("/logout", authMiddleware.protect, authController.logout);
router.get("/getAllUsers", authMiddleware.protect, userController.getAllUsers);

module.exports = router;
