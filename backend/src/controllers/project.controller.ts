import { Request, response, Response } from "express";
import { asyncHandler } from "../handler/asyncHandler.js";
import { getAuth } from "@clerk/express";
import { errorHandler } from "../handler/errorHandler.js";
import { isValidTemplate } from "../repository/project.repo.js";
import { REACT_JS_TEMPLATE_CMD } from "../config/template.config.js";
import prisma from "../db/config/prisma.client.js";
import z from "zod";
import { createNewProjectSchema } from "../validation/createProject.schema.js";
import { getUserById } from "../repository/user.repo.js";
import { responseHandler } from "../handler/responseHandler.js";
import { exec } from "node:child_process";
import path from "node:path";
import { buildDirectoryTree } from "../utils/buildDirectoryTree.utils.js";

export const createNewProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, isAuthenticated } = getAuth(req);

    if (!isAuthenticated) {
      return errorHandler(res, 401, "User not authenticated");
    }

    const userDetails = await getUserById(userId);

    if (!userDetails) {
      return errorHandler(res, 404, "User Details not found");
    }

    const { success, data, error } = z.safeParse(
      createNewProjectSchema,
      req.body,
    );

    console.log(error);
    if (!success) {
      return errorHandler(res, 400, "Validation Failed");
    }

    const { name, templateType } = data;

    // Step - 1 :- check params for which project user is requesting :-

    // Step - 2 :- Check if we support that template or not :-

    const isValid = await isValidTemplate(templateType);

    if (!isValid) {
      return errorHandler(res, 404, "Invalid Template Name provided");
    }

    // Step - 3 :- Create a new Project for this template in the `Projects` Folder :-

    const newProject = await prisma.projects.create({
      data: {
        templateId: isValid.id,
        name,
        userId: userDetails?.id,
      },
    });
    if (isValid.templateName === "REACT_JS") {
      const projectFolderPath = path.join(process.cwd(), "Projects");
      let cmd = `cd ${projectFolderPath} && `;
      const projectCreationCmd = REACT_JS_TEMPLATE_CMD.replace(
        "{PROJECT_NAME}",
        newProject.id,
      );

      cmd += projectCreationCmd;

      console.log("cmd : ", cmd);

      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          throw errorHandler(res, 500, error.message);
        }
        if (stdout) {
          console.log(stdout.toString());
        }
      });

      return responseHandler(res, 200, "ProjectId", {
        projectId: newProject.id,
      });
    }
  },
);

export const getProjectTree = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;

  if (!projectId) {
    return errorHandler(res, 400, "Project Id is required");
  }

  const projectPath = path.join(process.cwd(), "Projects", projectId);

  console.log({ projectPath });
  let output = await buildDirectoryTree(projectPath, []);

  return responseHandler(res, 200, "Structure", output);
});
