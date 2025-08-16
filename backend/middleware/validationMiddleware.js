// middleware/validationMiddleware.js
import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

export const requireImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image is required"
    });
  }
  next();
};