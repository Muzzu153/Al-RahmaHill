import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";
import doctorRoute from "./routes/doctorRoutes.js";
import userRoute from "./routes/UserRoutes.js";
import appointmentRoute from "./routes/appointmentsRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
app.use(express.json());

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5175",
      "https://al-rahma-hill.vercel.app",
    ],
    credentials: true,
  })
);

// api endpoints
app.use("/api/admin", adminRouter);
//  localhost:8000/api/admin

app.get("/", (req, res) => {
  res.send("API WORKING ");
});

// doctor api
app.use("/api", doctorRoute);

// users api
app.use("/api/user", userRoute);
app.use("/api/user", appointmentRoute);

app.listen(port, () => console.log("server started: ", port));
