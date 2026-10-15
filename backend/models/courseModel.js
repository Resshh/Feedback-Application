const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },

    course_name: {
        type: String,
        required: true,
        min: 1
    },

    course_duration: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },

});

module.exports = mongoose.model("course", courseSchema);