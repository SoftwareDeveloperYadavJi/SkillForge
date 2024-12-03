import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const checkAuth = async (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Token not found" });

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        // Attach the user to the request
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or Expired Token" });
    }
};
