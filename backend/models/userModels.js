import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: "" },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  address: { type: Object, default: { line1: "", line2: "" } },
  gender: { type: String, default: "Not Selected" },
  phone: {
    type: String,
    required: true,
    unique: true, // ✅ prevent duplicates at DB level
    match: [/^\d{10}$/, "Phone number must be only 10 digits"],
  },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
