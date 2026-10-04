const mongoose = require("mongoose");

const CATEGORIES = ["Project", "Startup", "Business", "App", "Technology", "Other"];
const STATUSES = ["New", "In Progress", "Completed"];

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title must be 100 characters or fewer"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description must be 2000 characters or fewer"],
    },
    category: {
      type: String,
      enum: { values: CATEGORIES, message: "Invalid category" },
      default: "Other",
    },
    status: {
      type: String,
      enum: { values: STATUSES, message: "Invalid status" },
      default: "New",
    },
    tags: {
      type: [String],
      default: [],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    // Every idea belongs to one user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;
module.exports.CATEGORIES = CATEGORIES;
module.exports.STATUSES = STATUSES;
