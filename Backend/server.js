require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use((cors()));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => 
        console.log("MongoDb connected"))
    .catch((err) => 
        console.log(err)
    );

app.use("/api/auth",authRoutes);

// console.log("working");

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running ${process.env.PORT}`);
});