import { Router } from "express";
import { getUserDetails } from "../controllers/user.controller.js";
import { requireAuth } from "@clerk/express";
const userRouter = Router();

userRouter.get("/", requireAuth(), getUserDetails);

export default userRouter;
