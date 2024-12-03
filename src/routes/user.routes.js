import express from "express";
import { checkAuth } from "../middleware/user.middleware.js";

import { registerUser , loginUser , userProfileUpdate } from "../controller/User.controller.js";


const router = express.Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/updateprofile" , checkAuth , userProfileUpdate);



export default router;