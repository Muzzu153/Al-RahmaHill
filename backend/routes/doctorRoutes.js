import express from "express"
import { getDocInfo, getDoctorsForUser } from "../controllers/doctorController.js"
import upload from "../middleware/multer.js"
import { addDcotorFast } from "../controllers/adminController.js"

const doctorRoute = express.Router()

doctorRoute.get("/all-doctors", getDoctorsForUser)
doctorRoute.get("/appointments/:id", getDocInfo)
doctorRoute.post('/add-doctors',  upload.single("image"), addDcotorFast)

export default doctorRoute