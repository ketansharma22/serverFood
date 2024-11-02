import { Router } from "express";
import { getAllUsers, loginControl, signUpControl } from "../controllers/userController.js";
const userRouter =Router()
userRouter.get('/',getAllUsers)
userRouter.post('/login',loginControl)
userRouter.post('/signup',signUpControl)
export default userRouter