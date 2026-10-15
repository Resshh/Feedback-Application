const express = require('express')
const router = express.Router()

const Course = require("../models/courseModel");

// post the course
router.post("/", async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json({ message: "Course Added Successfully", course });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get the courses
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find().sort({ id: 1 });
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
