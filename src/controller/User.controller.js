import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";

const validateUserInput = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(data);
};

export const registerUser = async (req, res) => {
    const { error } = validateUserInput(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    if (await User.findOne({ email: req.body.email }))
        return res.status(400).json({ message: "Email already exists" });


    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        const savedUser = await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving user" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(404).json({ message: "User not found" });

        // Validate the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return res.status(401).json({ message: "Invalid password" });

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Respond with the token
        res.json({ message: "Login Successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const userProfileUpdate = async (req, res) =>{
    const {linkdin , gitHub , twitter , education , bio } = req.body;
    try{
        const user = await User.findById(req.user._id);
        user.linkedin = linkdin;
        user.gitHub = gitHub;
        user.twitter = twitter;
        user.education = education;
        user.bio = bio;
        await user.save();
        res.status(200).json({ message: "User profile updated successfully" });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



