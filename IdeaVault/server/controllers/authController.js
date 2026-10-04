const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { asyncHandler } = require("../middleware/errorMiddleware");

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

// Creates a login token that lasts 7 days
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Only send safe user fields to the client (never the password)
const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

// POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {
  const name = (req.body.name || "").trim();
  const email = (req.body.email || "").trim().toLowerCase();
  const { password, confirmPassword } = req.body;

  // Validate the fields
  if (!name || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  if (!EMAIL_REGEX.test(email)) {
    res.status(400);
    throw new Error("Please enter a valid email address");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  // Check whether the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error("This email is already registered");
  }

  // Store the user (the password is hashed in the User model)
  const user = await User.create({ name, email, password });

  res.status(201).json({
    message: "Account created successfully",
    user: formatUser(user),
  });
});

// POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const email = (req.body.email || "").trim().toLowerCase();
  const { password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter your email and password");
  }

  // We ask for the password here because it is hidden by default
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    token: generateToken(user._id),
    user: formatUser(user),
  });
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json(formatUser(req.user));
});

module.exports = { registerUser, loginUser, getMe };
