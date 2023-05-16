import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
      default: 0,
    },
    otp: Number,
    otp_expiry: Date,
    resetPasswordOtp: Number,
    resetPasswordExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
