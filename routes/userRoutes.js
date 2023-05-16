import express from "express";
import {
  forgetPassword,
  loginController,
  registerController,
  resetPassword,
  verifyOtp,
} from "../controllers/userController.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//verify otp
router.post("/verifyOtp", verifyOtp);

//verify otp
router.post("/forgetpassword", forgetPassword);

//reset password
router.post("/resetPassword", resetPassword);
resetPassword;
//LOGIN || POST
router.post("/login", loginController);

export default router;
