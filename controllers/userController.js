import { hash } from "bcrypt"
import { compare } from "bcrypt"
import userModel from "../models/userModel.js"
import { createToken } from "../utils/token.js"
export const getAllUsers = async (req, res, next) => {
    try {
      const users = await userModel.find();
      return res.json({ message: "helo", users });
    } catch (error) {
      console.log(error);
    }
  };
export const loginControl=async(req,res,next)=>{
    const{email,password}=req.body
    const user=await userModel.findOne({email})
    if(!user) return res.status(401).json("User Does Not Exists")
    const isPassCorrect=await compare(password,user.password)
    if(!isPassCorrect) {
        return res.status(403).json("Incorrect password")
    }

    try {
        const token=createToken(user._id.toString(),user.email,"7d")
        const expires=new Date()
        expires.setDate(expires.getDate() + 7);
        res.status(200).cookie(process.env.COOKIE_NAME,token,{
            expires,
            httpOnly:true,
            signed:true
        })

      return res.status(200).json({email:user.email,name:user.name,message:"logged in"})

    } catch (error) {
        console.log(error)
        return res.json({message:"an error occured"})
    }
    
}
export const signUpControl=async(req,res,next)=>{
    const {name,email,password}=req.body
    const userExists=await userModel.findOne({email})
    if(userExists) return res.status(409).json({message:"user already exists"})
    const hashedPass=await hash(password,10)
    const newUser=new userModel({name,email,password:hashedPass})
    newUser.save()
    try {
        res.clearCookie(process.env.COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            secure:true,
          });
        const token =createToken(newUser._id.toString(),newUser.email,"7d")
        const expires=new Date()
        expires.setDate(expires.getDate() + 7);
        res.status(200).cookie(process.env.COOKIE_NAME, token, {
            expires,
            httpOnly: true,
            signed: true,
            
          });
          return res.json({email:email,name:name,message:"user created successfully"})
    } catch (error) {
        console.log(error)
    }
    
    
}