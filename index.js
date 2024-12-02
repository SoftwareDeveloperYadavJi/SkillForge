import 'dotenv/config'
import express from "express";
import connectDB from "./src/DB/index.js";
import userRoutes from "./src/routes/user.routes.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});