import mongoose from "mongoose";

// Define the User Schema
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePicture: {
            type: String,
            default:
                "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg",
        },
    },
    { timestamps: true }
);

// Create the User Model
const User = mongoose.model("User", userSchema);

export default User;
