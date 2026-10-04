const express = require("express");
const {
  getIdeas,
  getIdea,
  createIdea,
  updateIdea,
  deleteIdea,
  toggleFavorite,
} = require("../controllers/ideaController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Every idea route requires a logged-in user
router.use(protect);

router.route("/").get(getIdeas).post(createIdea);
router.route("/:id").get(getIdea).put(updateIdea).delete(deleteIdea);
router.patch("/:id/favorite", toggleFavorite);

module.exports = router;
