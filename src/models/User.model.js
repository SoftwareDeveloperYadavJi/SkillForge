import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match: /^\S+@\S+\.\S+$/, // Basic email regex
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    },
    profileImage:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        default:"user",
        enum:["admin","user"]
    },
    linkedin:{
        type:String,
    },
    gitHub:{
        type:String,
    },
    twitter:{
        type:String,
    },
    education:{
        type:String,
    },
    bio:{
        type:String
    },
    rating: {
        type: mongoose.Schema.Types.Mixed, // Allows both String and Number
        default: "Not Rated",
    }
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});




export default mongoose.model("User" , userSchema);