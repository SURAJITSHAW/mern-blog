import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorhandler } from "../utils/error.js";

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (
        !username ||
        !password ||
        !email ||
        username === "" ||
        password === "" ||
        email === ""
    ) {
        // ! here we actually dont have an error object, but have a logical error
        return res.status(400).json({
            message: "Please fill all the fields",
        });
        // next(errorhandler(400, "Please fill all the fields"));
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashPassword,
    });

    try {
        const user = await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        // res.status(400).json({
        //     message: error.message,
        // })
        next(error);
    }
};

export { signup };
