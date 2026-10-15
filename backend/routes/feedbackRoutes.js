const express = require("express");
const router = express.Router();

const feedback = require("../models/feedback");

// post the feedback
router.post("/", async (req, res) => {

    try {

        const feedback = new Product(req.body);

        await product.save();

        res.status(201).json({
            message: "Feedback Added Successfully",
            product
        });

    }
    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});

// get feedback
router.get("/", async (req, res) => {

    try {

        const feedback = await feedback.find();

        res.status(200).json(feedback);

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// update feedback
router.put("/:id", async (req, res) => {

    try {

        const updatedfeedback = await feedback.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedfeedback) {
            return res.status(404).json({
                message: "feedback not found"
            });
        }

        res.status(200).json({
            message: "Feedback Updated Successfully",
            updatedfeedback
        });

    }
    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// delete feedback
router.delete("/:id", async (req, res) => {

    try {

        const deletefeedback = await Product.findByIdAndDelete(req.params.id);

        if (!deletedfeedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        res.status(200).json({
            message: "Feedback Deleted Successfully"
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;