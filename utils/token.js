import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()
export const createToken=(id,email,expiresIn)=>{
    const token=jwt.sign({id:id,email:email},process.env.JWT_SECRET,{
        expiresIn:expiresIn
    })
    console.log(token)
    return token
}

export const verifyToken=async(req,res,next)=>{
    const token=req.signedCookies[`${process.env.COOKIE_NAME}`]
    if(!token || token.trim()===""){
        console.log("error")
        return res.status(401).json({message:"Token not received"})
    }
    
    return new Promise((resolve ,reject)=>{
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if(err){
                console.log(err)
                reject(err.message)
                return res.status(401).json({message:"Token expired"})
            }
            else{
                resolve()
                res.locals.jwtData=success
                return next()
            }
        })
    })
}