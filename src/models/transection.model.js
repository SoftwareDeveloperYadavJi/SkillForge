import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course"
    },
    rating:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
});

export default mongoose.model("Transaction" , transactionSchema);
