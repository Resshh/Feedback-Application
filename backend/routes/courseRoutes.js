const express=require('express')
const router=express('router')
const mongoose=require('mongoose')


const course= require("../models/courseModel");

// post the course
router.post("/", async (req, res) => {

    try {

        const course = new course(req.body);

        await course.save();

        res.status(201).json({
            message: "course Added Successfully",
            course
        });

    }
    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});
// get the courses
router.get("/",async(req,res)=>{
      
    try {

        const course = await course.find();

        res.status(200).json(course);

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }


})

module.exports=router;