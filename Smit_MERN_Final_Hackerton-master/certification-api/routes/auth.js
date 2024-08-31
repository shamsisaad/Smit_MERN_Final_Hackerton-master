import express from "express"
import AuthController from "../controllers/AuthController.js";

const authRoute = express.Router();


authRoute.post('/register',AuthController.Register)
authRoute.post('/login',AuthController.Login)


export default authRoute;