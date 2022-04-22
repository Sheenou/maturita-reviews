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
    },

    titlesAfterName: {
        type: String,
        max: 50
    }
})

module.exports = mongoose.model("UserInfo", userInfoSchema);