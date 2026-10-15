const mongoose = require("mongoose");
const course = require("./models/courseModel");

// sample courses so the dashboard has Course ID / duration to show
const seedCourses = [
    { id: 101, course_name: "MERN Stack", course_duration: 12 },
    { id: 102, course_name: "Python for Beginners", course_duration: 8 },
    { id: 103, course_name: "Data Structures", course_duration: 10 },
    { id: 104, course_name: "UI/UX Design", course_duration: 6 },
];

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
        if (await course.countDocuments() === 0) {
            await course.insertMany(seedCourses);
            console.log("Sample courses added");
        }
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = db;
