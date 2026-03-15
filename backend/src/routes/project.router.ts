import { Router } from "express";
import { requireAuth } from "@clerk/express";
import {
  createNewProject,
  getProjectTree,
} from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.post(
  "/create-project",
  requireAuth({ apiUrl: "/something" }),
  createNewProject,
);

projectRouter.get("/get-tree/:projectId", getProjectTree);

export default projectRouter;
