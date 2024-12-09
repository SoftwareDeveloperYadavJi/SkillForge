import Course from "../models/Course.modle.js";
import User from "../models/User.model.js";
import {uploadVideo, uploadeThumbMail} from "../services/cloudinaryConfig.js";

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

export const uploadednextVideo = async(req, res) =>{
    const courseId = req.params.id;

    try {
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({ message: "Course not found" });
        }
        const content = course.content;
        const {title , videoURL , thumbnailURL, duration} = req.body;
        const video = content.videoURL;
        const thumbnail = content.thumbnailURL;
        // uploading video to cloudinary
        const videoUploaded = await uploadVideo("src/video/WIN_20241017_16_02_22_Pro.jpg");
        const thumbnailUploaded = await uploadeThumbMail("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg");
        
        content.push({
            title:title,
            videoURL:videoUploaded.secure_url,
            thumbnailURL:thumbnailUploaded.secure_url,
            duration:duration
        });
        await course.save();
        res.status(200).json({ message: "Video uploaded successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



// fetch all courses
export const getAllCourses = async (req, res) =>{
    try {
        const cource = await Course.find({});
        res.status(200).json({ courses: cource });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}






