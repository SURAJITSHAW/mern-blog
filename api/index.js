import express from "express";
import mongoose from "mongoose";
import "dotenv/config";


const app = express();

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connection established");
    })
    .catch((err) => {
        console.error("Error connecting to database:", err);
    });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
