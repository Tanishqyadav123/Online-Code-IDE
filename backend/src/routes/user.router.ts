import { Router } from "express";
import { getUserDetails } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.get("/", getUserDetails);

export default userRouter;
