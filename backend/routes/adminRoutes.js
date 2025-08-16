import express from "express";
import { addDoctor, allDoctor, loginAdmin, toggleAvailability } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import validateDoctor from "../validators/doctorValidator.js";
import {
  handleValidationErrors,
  requireImage,
} from "../middleware/validationMiddleware.js";
import { authAdmin } from "../middleware/AuthAdmin.js";

const adminRouter = express.Router();

adminRouter.post(
  "/add-doctor",
  authAdmin,
  upload.single("image"),
  validateDoctor,
  requireImage,
  handleValidationErrors,
  addDoctor
);

adminRouter.post(
  "/login",
  loginAdmin
);

adminRouter.post("/all-doctors", authAdmin, allDoctor)

adminRouter.patch('/doctor-availability', authAdmin, toggleAvailability);

export default adminRouter;
