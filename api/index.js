import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import "dotenv/config";
import authRouter from "./routes/auth.route.js";


const app = express();

// ! middlewares
app.use(express.json());

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


// ! routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
