const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: true
    },

    "type": {
        type: String,
        required: true
    },

    "public": {
        type: Boolean,
        default: false,
    },

    "student" : {
        "firstName" : {
            type : String,
            required : true
        },
        "lastName" : {
            type : String,
            required : true
        },
        "class" : {
            type : String,
            required : true
        }
    },

    "date" : {type: Date, default: Date.now(), required: true},

    "criteria" : {
        "compliance" : {
            type: String,
            required: true
        },

        "suitability" : {
            type: String,
            required: true
        },

        "functionality" : {
            type: String,
            required: true
        },

        "typography" : {
            type: String,
            required: true
        },

        "evaluation": {
            type: String,
            required: true
        },

        "questions": {
            type: Array,
            required: true
        },

        "grade": {
            type: Number,
            required: true
        }
    },

    "consultant": {
        "firstName": {
            type: String,
        },

        "lastName": {
            type: String,
        },

        "titlesBeforeName": {
            type: String,
        },

        "titlesAfterName": {
            type: String,
        },
    }
})

module.exports = mongoose.model("Review", reviewSchema);