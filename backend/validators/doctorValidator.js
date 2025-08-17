import { body } from "express-validator";

const validateDoctor = [
  body("name").notEmpty().withMessage("The name should not be empty").trim(),
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .notEmpty()
    .withMessage("The email should not be empty")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password min 6 chars"),
  body("speciality").notEmpty().withMessage("Speciality is required"),
  body("degree").notEmpty().withMessage("Degree is required"),
  body("experience")
    .notEmpty()
    .isInt({ min: 0 })
    .trim()
    .withMessage("Valid experience required"),
  body("about")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("About min 10 chars"),
  body("fee").notEmpty().isFloat({ min: 0 }).withMessage("Valid fee required"),
  body("address").notEmpty().withMessage("Address is required"),
];

export default validateDoctor;
