const mongoose = require("mongoose");

const userLoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    }
})

module.exports = mongoose.model("UserLogin", userLoginSchema);