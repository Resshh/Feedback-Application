const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },

    course_name: {
        type: String,
        required: true,
        unique: true
    },

    // duration in weeks
    course_duration: {
        type: Number,
        required: true
    },

});

module.exports = mongoose.model("course", courseSchema);
