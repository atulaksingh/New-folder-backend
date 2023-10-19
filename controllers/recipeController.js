const recipeModel = require("../models/recipe");
const multer = require("multer")
const path = require("path")
// const upload = multer({
//     dest: "./upload/images"
// })
// upload.array('file'), (req, res) => {
//     console.log("body", req.body)
//     console.log("files", req.files)
// }
async function handleSubmitRecipe(req, res) {
    console.log("ab", req.body)
    console.log("dj", req.files)
    // const { title, profile } = req.body;
    // console.log("title", req.body)
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'uploads/');
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, file.originalname);
    //     },
    // });

    // const upload = multer({ storage: storage });
    // upload.single('image'), (req, res) => {
    //     console.log("sd", req.file)
    //     res.send('File uploaded successfully!');
    // }
    console.log("body", req.body)

}

module.exports = { handleSubmitRecipe }