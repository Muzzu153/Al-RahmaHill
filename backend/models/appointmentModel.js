import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    selectedDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: String, // e.g. "30 mins"
    },

    // Snapshot data (stored at booking time)
    doctorName: { type: String, required: true },
    fee: {
      type: Number,
      required: true,
    },

    selectedSlot: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
      // required: true,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled", "completed"],
      default: "booked",
    },
    notes: {
      type: String,
      trim: true,
    },

    bookedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    cancelledAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
