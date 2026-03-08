import { NextFunction, Response, Router } from "express";
import { clerkWebhook } from "../controllers/clerk.controller.js";
import express from "express";
const clerkRouter = Router();

clerkRouter.post(
  "/webhook",
  //   express.raw({ type: "application/json" }),
  clerkWebhook,
);

export default clerkRouter;
