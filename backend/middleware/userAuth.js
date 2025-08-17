import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.header("utoken") ||
      req.cookies?.utoken;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);

    // Check if token has required user role
    if (decoded.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Invalid user role.",
      });
    }

    // Add user info to request object
    req.user = {
      userId: decoded.userId,
      phone: decoded.phone,
      role: decoded.role,
    };

    // Continue to next middleware/route
    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired.",
      });
    }

    // Generic error response
    return res.status(500).json({
      success: false,
      message: "Server error during authentication.",
    });
  }
};

export { userAuth };
