import { Router } from "express";
import { mainController } from "../controllers/userController.js";
const mainRouter=Router()
mainRouter.get('/nearby-restaurants',mainController)

export default mainRouter