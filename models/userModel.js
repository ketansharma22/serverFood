import mongoose from "mongoose";
import { randomUUID } from "crypto";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    opt:{
        type:String,
    },
    otpexpire:{
        type:String,
    },
    
})

export default mongoose.model("userModel",userSchema)