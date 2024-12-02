import mongoose from "mongoose";
// DB connection
const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/SkillForge", {
           
        });
        console.log("Connected to MongoDB");

    }catch(error){

        console.log(error);

    }
}

export default connectDB;
