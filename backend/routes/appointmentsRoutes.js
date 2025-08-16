import express from "express";
import { bookAppointment } from "../controllers/appointmentsController.js";
import { userAuth } from "../middleware/userAuth.js";

const appointmentRoute = express.Router();

appointmentRoute.post("/book-appointments", userAuth, bookAppointment);

export default appointmentRoute;
