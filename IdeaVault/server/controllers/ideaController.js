const mongoose = require("mongoose");
const Idea = require("../models/Idea");
const { CATEGORIES, STATUSES } = require("../models/Idea");
const { asyncHandler } = require("../middleware/errorMiddleware");

// Turn "a, b, c" (or an array) into a clean array of tags
const cleanTags = (tags) => {
  let list = [];
  if (Array.isArray(tags)) list = tags;
  else if (typeof tags === "string") list = tags.split(",");

  const cleaned = list.map((tag) => String(tag).trim()).filter(Boolean);
  return [...new Set(cleaned)].slice(0, 10);
};

// Validate the body of create/update requests and return clean data
const validateIdeaBody = (body, res) => {
  const title = (body.title || "").trim();
  const description = (body.description || "").trim();
  const category = body.category || "Other";
  const status = body.status || "New";

  if (!title || !description) {
    res.status(400);
    throw new Error("Title and description are required");
  }
  if (title.length > 100) {
    res.status(400);
    throw new Error("Title must be 100 characters or fewer");
  }
  if (description.length > 2000) {
    res.status(400);
    throw new Error("Description must be 2000 characters or fewer");
  }
  if (!CATEGORIES.includes(category)) {
    res.status(400);
    throw new Error("Invalid category");
  }
  if (!STATUSES.includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  return { title, description, category, status, tags: cleanTags(body.tags) };
};

// Make sure the ID in the URL is a valid MongoDB ID
const checkId = (id, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid idea ID");
  }
};

// Find an idea that belongs to the logged-in user (or send 404)
const findMyIdea = async (req, res) => {
  checkId(req.params.id, res);
  const idea = await Idea.findOne({ _id: req.params.id, user: req.user._id });
  if (!idea) {
    res.status(404);
    throw new Error("Idea not found");
  }
  return idea;
};

// GET /api/ideas
// Optional query params: search, category, status, favorite=true
const getIdeas = asyncHandler(async (req, res) => {
  const { search, category, status, favorite } = req.query;

  // Always limit results to the logged-in user's ideas
  const filter = { user: req.user._id };

  if (category && category !== "All") filter.category = category;
  if (status && status !== "All") filter.status = status;
  if (favorite === "true") filter.favorite = true;

  if (search && search.trim()) {
    const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");
    filter.$or = [{ title: regex }, { description: regex }, { tags: regex }];
  }

  const ideas = await Idea.find(filter).sort({ createdAt: -1 });
  res.json(ideas);
});

// GET /api/ideas/:id
const getIdea = asyncHandler(async (req, res) => {
  const idea = await findMyIdea(req, res);
  res.json(idea);
});

// POST /api/ideas
const createIdea = asyncHandler(async (req, res) => {
  const data = validateIdeaBody(req.body, res);
  const idea = await Idea.create({ ...data, user: req.user._id });
  res.status(201).json(idea);
});

// PUT /api/ideas/:id
const updateIdea = asyncHandler(async (req, res) => {
  const idea = await findMyIdea(req, res);
  const data = validateIdeaBody(req.body, res);

  idea.title = data.title;
  idea.description = data.description;
  idea.category = data.category;
  idea.status = data.status;
  idea.tags = data.tags;

  const updated = await idea.save();
  res.json(updated);
});

// DELETE /api/ideas/:id
const deleteIdea = asyncHandler(async (req, res) => {
  const idea = await findMyIdea(req, res);
  await idea.deleteOne();
  res.json({ message: "Idea deleted", id: req.params.id });
});

// PATCH /api/ideas/:id/favorite  (adds or removes the favorite)
const toggleFavorite = asyncHandler(async (req, res) => {
  const idea = await findMyIdea(req, res);
  idea.favorite = !idea.favorite;
  const updated = await idea.save();
  res.json(updated);
});

module.exports = {
  getIdeas,
  getIdea,
  createIdea,
  updateIdea,
  deleteIdea,
  toggleFavorite,
};
