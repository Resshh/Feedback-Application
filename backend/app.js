const express = require("express");

require("dotenv").config();

const db = require("./connection");
const app = express();

db();

app.use(express.json());


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});