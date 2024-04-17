import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import "dotenv/config";
import authRouter from "./routes/auth.route.js";



const app = express();


// ! middleware
app.use(express.json());
// ! routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
// ! error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})

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
