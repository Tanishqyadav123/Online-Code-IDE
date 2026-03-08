import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../handler/asyncHandler.js";
import { errorHandler } from "../handler/errorHandler.js";
import prisma from "../db/config/prisma.client.js";

export const getUserDetails = asyncHandler((req: Request, res: Response) => {
  return errorHandler(res, 400, "User Details not found");
});
