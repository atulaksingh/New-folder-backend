const express = require("express");
const { handleSubmitRecipe } = require("../controllers/recipeController");
const multer = require("multer");
const router = express.Router();
router.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const upload = multer({ storage: storage })

// router.post("/postrecipe", upload.array('profile'), (req, res) => {
//     console.log("ab", req.body)
//     console.log("dj", req.files)
// })

router.post("/postrecipe", upload.fields([{ name: "image" }, { name: "file" }]), handleSubmitRecipe)

module.exports = router;