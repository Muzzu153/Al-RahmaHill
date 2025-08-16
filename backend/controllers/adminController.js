import doctorModel from "../models/doctorModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
    } = req.body;

    const imageFile = req.file;

    // checking for all data to add doctor
    const hasedPassword = await hashPassword(password);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageURL = imageUpload.secure_url;

    console.log({
      name,
      email,
      hasedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
      imageFile,
    });

    const doctorDate = {
      name,
      email,
      image: imageURL,
      password: hasedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: JSON.parse(address),
      date: new Date(),
    };

    const newDoctor = new doctorModel(doctorDate);
    await newDoctor.save();

    res.json({ success: true, message: "doctor added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      console.log(jwt.decode(token));
      console.log(jwt.verify(token, process.env.JWT_SECRET));
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const allDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const { doctorId, available } = req.body;
    await doctorModel.findByIdAndUpdate(doctorId, { available });
    res.json({ success: true, message: "Availability updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const doctor = [];

const addDcotorFast = async (req, res) => {
  try {
    const {
      email,
      name,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
    } = req.body;

    const imageFile = req.file;

    console.log("Files received:", req.file); // This should show the image
    console.log("Body received:", req.body);

    if (!imageFile) {
      console.log(imageFile);
      return res.json({ message: "Image file is missing" });
    }

    const hashedPassword = await hashPassword(password);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: JSON.parse(address),
      image: imageUrl,
      date: new Date(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Server: doctor added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctor,
  toggleAvailability,
  addDcotorFast,
};
