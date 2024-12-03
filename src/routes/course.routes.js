import express from "express";
import { createCourse } from "../controller/Coures.controller.js";
import { checkAuth } from "../middleware/user.middleware.js";

const router = express.Router();


router.post("/create" , checkAuth , createCourse);



export default router;