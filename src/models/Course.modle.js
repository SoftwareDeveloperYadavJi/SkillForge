import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    content:[
        {
            title:{
                type:String,
                required:true
            },
            thumbnailURL:{
                type:String,
                required:true
            },
            videoURL:{
                type:String,
                requried:true
            },
            duration:{
                type:Number,
                required:true
            },
        }
        
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            rating:{
                type:Number,
            }
        }
    ],
    likes:{
        type:Number,
        default:0
    },
    
}, { timestamps: true });



export default mongoose.model("Course" , courseSchema);

