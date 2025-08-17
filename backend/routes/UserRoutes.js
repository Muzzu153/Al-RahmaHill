import express from "express";
import { loginUser, userSignup } from "../controllers/userController.js";
import { getUserAppointments } from "../controllers/appointmentsController.js";
import { userAuth } from "../middleware/userAuth.js";

const userRoute = express.Router();

userRoute.post("/signup", userSignup);
userRoute.post("/login", loginUser);
userRoute.get("/my-appointments", userAuth, getUserAppointments);

export default userRoute;
