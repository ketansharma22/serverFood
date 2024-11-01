import { Router } from "express";
import { loginControl, signUpControl } from "../controllers/userController.js";
const userRouter =Router()
userRouter.post('/login',loginControl)
userRouter.post('/signup',signUpControl)
export default userRouter