import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

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
        // return res.status(400).json({
        //     message: "Please fill all the fields",
        // });
        next(errorhandler(400, "Please fill all the fields"));
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

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (
        !password ||
        !email ||
        password === "" ||
        email === ""
    ) {
        // ! here we actually dont have an error object, but have a custom error
        // return res.status(400).json({
        //     message: "Please fill all the fields",
        // });
        next(errorhandler(400, "Please fill all the fields"));
    }
try {
    
    const validUser = await User.findOne({ email });
    if (!validUser) {
        next(errorhandler(404, "User not found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
        next(errorhandler(400, "Invalid password"));
    }

    const token = jwt.sign(
        { id: validUser._id, username: validUser.username },
        process.env.JWT_SECRET
    );

    const { password: userPassword, ...userWithoutPassword } = validUser._doc;

    res.status(200)
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .json({
            success: true,
            data: userWithoutPassword,
        });
} catch (error) {
    next(error);
}

}

const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res.status(200)
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.toLowerCase().split(" ").join("") +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res.status(200)
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
}

export { signup, signin, google };
