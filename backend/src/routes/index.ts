import { Router } from "express";
import userRouter from "./user.router.js";
import clerkRouter from "./clerk.router.js";
const router = Router();

router.use("/users", userRouter);
router.use("/clerk", clerkRouter);
export default router;
