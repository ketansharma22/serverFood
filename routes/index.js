import { Router } from "express";
import userRouter from "./userRouter.js";
import mainRouter from "./mainRoute.js";
const appRouter=Router()
appRouter.use('/users',userRouter)
appRouter.use('/main',mainRouter)
export default appRouter