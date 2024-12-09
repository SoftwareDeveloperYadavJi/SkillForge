import express from "express";
import { createCourse , getAllCourses  , uploadednextVideo } from "../controller/Coures.controller.js";
import { checkAuth } from "../middleware/user.middleware.js";

const router = express.Router();


router.post("/create" , checkAuth , createCourse);
router.get("/all"  , getAllCourses);
router.post("/uploadvideo/:id" , uploadednextVideo);




export default router;