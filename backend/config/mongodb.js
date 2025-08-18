import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check if MONGODB_URI exists
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    // Set up event listeners before connecting
    mongoose.connection.on("connected", () => {
      console.log("Database Connected Successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });

    // Connect to MongoDB
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
