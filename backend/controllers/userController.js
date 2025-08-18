import express, { response } from "express";
import userModel from "../models/userModels.js";
import doctorModel from "../models/doctorModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

const userSignup = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    const existingUser = await userModel.findOne({ phone });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Phone already registered" });
    }

    const hashedPassword = await hashPassword(password);
    const userData = { name, phone, password: hashedPassword };

    const newUser = new userModel(userData);
    await newUser.save();

    generateJwtForUser(res, newUser, "Server: User added successfully");

    // res.json({ success: true, message: "Server: User added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const generateJwtForUser = async (res, user, message) => {
  const utoken = jwt.sign(
    {
      userId: user._id,
      role: "user",
      phone: user.phone,
    },
    process.env.USER_JWT_SECRET,
    {
      expiresIn: "7d", // Token expires in 7 days
      issuer: "AlRahmaHill", // Optional: add issuer
      audience: "user", // Optional: add audience
    }
  );

  return res
    .status(200)
    .json({ success: true, user, message: message, utoken, expiresIn: "7d" });
};

const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await userModel.findOne({ phone: phone });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bycrpt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ succes: false, message: "Invalid Password" });
    }

    generateJwtForUser(res, user, "Logged-in successfully");
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserOnRefresh = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export { userSignup, generateJwtForUser, loginUser, getUserOnRefresh };
