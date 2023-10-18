const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    useremail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userpassword: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const UserModel = mongoose.model("userSchema", userSchema);

module.exports = UserModel;