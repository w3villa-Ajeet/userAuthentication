import express from "express";
import {
  loginController,
  registerController,
  verifyOtp,
} from "../controllers/userController.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//verify otp
router.post("/verifyOtp", verifyOtp);
//LOGIN || POST
router.post("/login", loginController);

export default router;
