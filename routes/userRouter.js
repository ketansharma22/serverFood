import { Router } from "express";
import { getAllUsers, loginControl, signUpControl, verifyUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/token.js";
const userRouter =Router()
userRouter.get('/',getAllUsers)
userRouter.post('/login',loginControl)
userRouter.post('/signup',signUpControl)
userRouter.get('/auth-status',verifyToken,verifyUser)
export default userRouter