import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import JWT from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";

//USER REGISTRATION
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);

    const otp = Math.floor(Math.random() * 1000000);
    //creating new user
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    }).save();

    await sendMail(name, email, otp);

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    res.status(201).send({
      success: true,
      message:
        "User Register Successfully,otp has been send to your mail please verify,it will expire within 5 minutes",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//VERYFY EMAIL OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const numberOtp = Number(otp);

    const user = await userModel.findOne({ email });

    if (user.otp !== numberOtp || user.otp_expiry < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP or has been Expired" });
    }

    user.verified = true;
    user.otp = null;
    user.otp_expiry = null;

    await user.save();
    res.status(200).send({
      success: true,
      message: "please login",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//USER LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgot password
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    const otp = Math.floor(Math.random() * 1000000);

    user.resetPasswordOtp = otp;
    user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const message = `Your OTP for reseting the password ${otp}. If you did not request for this, please ignore this email.`;

    await sendMail(user.name, email, otp);

    res.status(200).json({ success: true, message: `OTP sent to ${email}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//reset password
export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    const user = await userModel.findOne({
      resetPasswordOtp: otp,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Otp Invalid or has been Expired" });
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordExpiry = null;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: `Password Changed Successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all user without any condition

// export const getAllUser = async (req, res) => {
//   try {
//     const AllUser = await userModel.find({});
//     console.log(AllUser);
//     res.status(200).send({ success: true });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

//all user with pagination
// product list base on page
export const getAllUser = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.query.page ? req.query.page : 1;
    const allUser = await userModel
      .find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      allUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

//getuserby search
export const getSearchedUser = async (req, res) => {
  try {
    const { keyword } = req.params;
    console.log(keyword);
    const resutls = await userModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).send({ resutls });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search user API",
      error,
    });
  }
};
