import express from "express";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";

const bookAppointment = async (req, res) => {
  try {
    const {
      docId,
      selectedDate,
      selectedSlot,
      fee,
      paymentStatus,
      status,
      doctorName,
    } = req.body;

    const userId = req.user.userId;

    // Validate required fields
    if (!docId || !selectedDate || !selectedSlot) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: docId, selectedDate, selectedSlot",
      });
    }

    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Check if slot is already booked
    const existingAppointment = await appointmentModel.findOne({
      docId,
      selectedDate,
      selectedSlot,
      status: { $ne: "cancelled" }, // Not cancelled
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "This time slot is no longer available",
      });
    }

    const newAppointment = new appointmentModel({
      docId,
      userId,
      selectedDate,
      selectedSlot,
      fee,
      paymentStatus,
      status,
      doctorName,
    });

    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment Booked successfully",
      newAppointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const appointmentList = await appointmentModel
      .find({ userId })
      .populate("docId", "name speciality image ")
      .sort({ selectedDate: 1 });

    const mapped = appointmentList.map((app) => ({
      ...app.toObject(),
      date: app.selectedDate,
      time: app.selectedSlot,
      doctorName: app.docId?.name || app.doctorName, // fallback to snapshot
      doctorName: app.docId?.fee || app.fee, // fallback to snapshot
      department: app.docId?.speciality,
      photo: app.docId?.image || "/images/default-doctor.jpg",
    }));

    res.status(200).json({ success: true, mapped });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export { bookAppointment, getUserAppointments };
