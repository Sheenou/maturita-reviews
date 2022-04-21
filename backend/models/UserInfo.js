const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: 50
    },

    lastName: {
        type: String,
        required: true,
        max: 50
    },

    titlesBeforeName: {
        type: String,
        required: true,
    },

    titlesAfterName: {
        type: String,
        required: true,
        max: 50
    }
})

module.exports = mongoose.model("UserInfo", userInfoSchema);