const express = require("express");
const router = express.Router();

const Feedback = require("../models/feedbackModel");
const Course = require("../models/courseModel");

// post the feedback
router.post("/", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ message: "Feedback Added Successfully", feedback });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get feedback, joined with course details (id, duration) for the dashboard
router.get("/", async (req, res) => {
    try {
        const [feedbacks, courses] = await Promise.all([Feedback.find().lean(), Course.find().lean()]);
        const byName = Object.fromEntries(courses.map(c => [c.course_name, c]));
        res.status(200).json(feedbacks.map(f => ({
            ...f,
            course_id: byName[f.course_name]?.id ?? "-",
            course_duration: byName[f.course_name]?.course_duration ?? "-",
        })));
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get one feedback (for the edit form)
router.get("/:id", async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).json({ message: "Feedback not found" });
        res.status(200).json(feedback);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// update feedback
router.put("/:id", async (req, res) => {
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedFeedback) return res.status(404).json({ message: "Feedback not found" });
        res.status(200).json({ message: "Feedback Updated Successfully", updatedFeedback });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete feedback
router.delete("/:id", async (req, res) => {
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!deletedFeedback) return res.status(404).json({ message: "Feedback not found" });
        res.status(200).json({ message: "Feedback Deleted Successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
