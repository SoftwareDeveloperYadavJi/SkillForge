import express from "express";
import { createCourse , getAllCourses } from "../controller/Coures.controller.js";
import { checkAuth } from "../middleware/user.middleware.js";

const router = express.Router();


router.post("/create" , checkAuth , createCourse);
router.get("/all"  , getAllCourses);




export default router;