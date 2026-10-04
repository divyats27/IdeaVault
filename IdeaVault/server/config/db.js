const mongoose = require("mongoose");

// Connects to MongoDB using the MONGO_URI value from the .env file
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Could not connect to MongoDB.");
    console.error("Reason:", error.message);
    console.error(
      "Check that MongoDB is running and that MONGO_URI in server/.env is correct."
    );
    process.exit(1);
  }
};

module.exports = connectDB;
