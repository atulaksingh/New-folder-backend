const express = require("express");
const { handleSubmitRecipe } = require("../controllers/recipeController");
const multer = require("multer");
const router = express.Router();
router.use(express.urlencoded({ extended: false }));

const upload = multer({
    dest: './upload/images'
})
router.post("/postrecipe", upload.single('profile'), (req, res) => {
    console.log("dj",req.file)
})


module.exports = router;