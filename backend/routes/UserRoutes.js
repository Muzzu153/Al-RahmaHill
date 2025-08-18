import express from "express";
import { getUserOnRefresh, loginUser, userSignup } from "../controllers/userController.js";
import { getUserAppointments } from "../controllers/appointmentsController.js";
import { userAuth } from "../middleware/userAuth.js";

const userRoute = express.Router();

userRoute.post("/signup", userSignup);
userRoute.post("/login", loginUser);
userRoute.get("/my-appointments", userAuth, getUserAppointments);
userRoute.get("/me", userAuth, getUserOnRefresh);

export default userRoute;
