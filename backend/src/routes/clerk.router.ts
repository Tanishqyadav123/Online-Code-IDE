import { NextFunction, Response, Router } from "express";
import { clerkWebhook } from "../controllers/clerk.controller.js";
import express from "express";
const clerkRouter = Router();

clerkRouter.post(
  "/webhook",
  clerkWebhook,
);

export default clerkRouter;
