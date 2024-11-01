import { hash } from "bcrypt"
import { compare } from "bcrypt"
import userModel from "../models/userModel.js"
import { createToken } from "../utils/token.js"
export const loginControl=async(req,res,next)=>{
    const{email,password}=req.body
    console.log(email,password)
}
export const signUpControl=async(req,res,next)=>{
    const {name,email,password}=req.body
    const userExists=userModel.findOne({email})
    if(userExists) return res.json({message:"user already exists"})
    const hashedPass=await hash(password,10)
    const newUser=new userModel({name,email,hashedPass})
    newUser.save()
    try {
        const token =createToken(newUser._id.toString(),newUser.email,"7d")
        const expires=new Date()
        expires.setDate(expires.getDate() + 7);
        res.status(200).cookie(process.env.COOKIE_NAME, token, {
            expires,
            httpOnly: true,
            signed: true,
            // domain:"localhost",
          });
          return res.json({message:"user created successfully"})
    } catch (error) {
        console.log(error)
    }
    
    
}