const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { asyncHandler } = require("./errorMiddleware");

// Protects routes: only logged-in users can continue
const protect = asyncHandler(async (req, res, next) => {
  // 1. Read the token from the "Authorization: Bearer <token>" header
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Not authorized. Please log in.");
  }
  const token = header.split(" ")[1];

  // 2. Verify the token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401);
    throw new Error("Your session has expired. Please log in again.");
  }

  // 3. Find the logged-in user
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(401);
    throw new Error("User no longer exists. Please log in again.");
  }

  // 4. Allow access to the protected route
  req.user = user;
  next();
});

module.exports = { protect };
