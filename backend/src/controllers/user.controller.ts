import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../handler/asyncHandler.js";
import { errorHandler } from "../handler/errorHandler.js";
import { responseHandler } from "../handler/responseHandler.js";
import { getUserById } from "../repository/user.repo.js";
import { getAuth } from "@clerk/express";

export const getUserDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      return errorHandler(res, 401, "User not authenticated");
    }

    const userDetails = await getUserById(userId);

    if (!userDetails) {
      return errorHandler(res, 404, "User Details not found");
    }

    return responseHandler(res, 200, "User Details ", {
      userDetails,
    });
  },
);
