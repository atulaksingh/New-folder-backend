const recipeModel = require("../models/recipe");
const multer = require("multer")
async function handleSubmitRecipe(req, res) {
    const { title } = req.body;
    console.log("title", title)

}

module.exports = { handleSubmitRecipe }