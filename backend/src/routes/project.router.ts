import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { createNewProject } from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.post(
  "/create-project",
  requireAuth({ apiUrl: "/something" }),
  createNewProject,
);

export default projectRouter;
