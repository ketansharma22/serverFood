import { hash } from "bcrypt"
import { compare } from "bcrypt"
import userModel from "../models/userModel.js"
import fsqDevelopers from '@api/fsq-developers';
import { createToken } from "../utils/token.js"
import axios from 'axios'
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
        return res.status(403).json({message:"Incorrect password"})
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

      return res.status(200).json({email:user.email,name:user.name,message:"logged in",status:"200"})

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

export const verifyUser=async(req,res,next)=>{
  try {
    const user=await userModel.findById(res.locals.jwtData.id)
    
    if(!user) return res.status(401).json({message:"user not registered or token malfunctioned"})

    if(user._id.toString()!==res.locals.jwtData.id){
      return res.status(401).json({message:"permission didn't matched"})
    }

    return res.status(200).json({message:"done",email:user.email,name:user.name
    })
  } catch (error) {
    console.log(error)
    return res.status(401).json({message:"an error occured",cause:error.message})
  }
}

export const logoutUser=async(req,res,next)=>{
  try {
    console.log("logout")
    const user=await userModel.findById(res.locals.jwtData.id)
    if(!user){
      return res.status(401).json({message:"user not registered or token malfunctioned"})
    }
    if(user._id.toString()!== res.locals.jwtData.id){
      return res.status(401).send("Permissions didn't match");
    }
  
    res.clearCookie(process.env.COOKIE_NAME,{httpOnly:true,signed:true}
    )
    return res.status(200).json({message: "logged out", name: user.name, email: user.email })
  } catch (error) {
   console.log(error)
   return res.status(401).json({message:"an error occured"}) 
  }

}

export const mainController=async(req,res,next)=>
{
  console.log("enter")
  try {
    const response = await axios.get('https://api.foursquare.com/v3/places/search', {
      headers: {
        Authorization: 'fsq3X274u8DYexMm8ewK6K8o0tGjPWgRUP8I+PbJGS17u/8=',
      },
      params: {
        near: 'ambala, haryana',
        query: 'restaurant',
        limit: 10,
      },
    });
    console.log(response.data.results)
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Foursquare' });
  }
}
