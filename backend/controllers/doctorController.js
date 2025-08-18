import doctorModel from "../models/doctorModel.js";
import { ObjectId } from "mongodb";

const getDoctorsForUser = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({})
      .select("-password -email")
      .sort({ date: 1 }) // or { date: -1 }
      .lean();

    // Prevent caching
    res.set({
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getDocInfo = async (req, res) => {

  try {
    const doctorInfo = await doctorModel.findById(req.params.id);
    if (!doctorInfo) {
      return res
        .status(404)
        .json({ success: false, message: "Item not Found" });
    }
    res.status(200).json({ success: true, doctorInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getDoctorsForUser, getDocInfo };
