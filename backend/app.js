const express = require("express");
const mongoose=require("mongoose");
require("dotenv").config();

const db = require("./connection");
const app = express();

const feedbackRoutes=require('./routes/feedbackRoutes')
const courseRoutes=require('./routes/courseRoutes')

const courseModel=require('./models/courseModel')
const feedbackModel=require('./models/feedbackModel')
db();

app.use(express.json());
app.use('/course','courseSchema')


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});