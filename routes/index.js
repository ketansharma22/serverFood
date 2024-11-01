import { Router } from "express";
import userRouter from "./userRouter.js";
const appRouter=Router()
appRouter.use('/users',userRouter)

export default appRouter