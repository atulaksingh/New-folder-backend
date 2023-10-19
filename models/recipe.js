const mongoose = require("mongoose")
const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        requred: true,
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    method: {
        type: Array,
        required: true
    }
}, { timestamps: true });

const recipeModel = mongoose.model("recipeSchema", recipeSchema);
module.exports = recipeModel;