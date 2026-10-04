const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load variables from the .env file first
dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const ideaRoutes = require("./routes/ideaRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Stop early with a clear message if .env is not set up
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("Missing MONGO_URI or JWT_SECRET.");
  console.error("Copy server/.env.example to server/.env and fill in the values.");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "IdeaVault API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);

// These two must stay at the bottom
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
