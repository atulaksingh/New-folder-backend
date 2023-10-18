const mongoose = require("mongoose")
const recipeSchema = new mongoose.Schema({
    recipe_name: {
        type: String,
        required: true,
    },
     // recipe_image: {
    //     type: String,
    //     requred: true,
    // },
    // recipe_image: {
    //     type: String,
    //     requred: true,
    // },
    // recipe_description: {
    //     type: String,
    //     required: true
    // },
    // recipe_author: {
    //     type: String,
    //     required: true
    // },
    // recipe_ingredients: {
    //     type: Array,
    //     required: true
    // },
    // recipe_method: {
    //     type: Array,
    //     required: true
    // }
}, { timestamps: true });

const recipeModel = mongoose.model("recipeSchema", recipeSchema);
module.exports = recipeModel;