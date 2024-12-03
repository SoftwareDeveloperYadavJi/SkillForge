import Course from "../models/Course.modle.js";
import User from "../models/User.model.js";

export const createCourse = async (req, res) => {
    const { title , description , content} = req.body;
    if(!title || !description || !content){
        return res.status(400).json({ message: "Please provide all the required fields" });
    }
    try {
        
        const course = new Course({
            title,
            description,
            content,
            creator:req.user._id
        });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


