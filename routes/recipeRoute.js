const express = require("express");
const { handleSubmitRecipe } = require("../controllers/recipeController");
const router = express.Router();

router.post("/postrecipe", handleSubmitRecipe)

module.exports = router;