const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./connection");
const app = express();

const feedbackRoutes = require('./routes/feedbackRoutes')
const courseRoutes = require('./routes/courseRoutes')

db();

app.use(cors());
app.use(express.json());
app.use('/course', courseRoutes)
app.use('/feedback', feedbackRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
