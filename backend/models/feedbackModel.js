const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true
    },

    feedback_comment: {
        type: String,
        required: true
    },

    feedback_rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
});

module.exports = mongoose.model("feedback", feedbackSchema);