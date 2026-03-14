import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../handler/asyncHandler.js";
import { errorHandler } from "../handler/errorHandler.js";
import jwt from "jsonwebtoken";
export const authMiddleware = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);

    if (!token) {
      return errorHandler(res, 401, "Toke not provided");
    }

    verifyToken(token);

    next();
  },
);

export const extractToken = (req: Request) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader?.split(" ")[1];

  return token;
};

export const verifyToken = (token: string) => {
  console.log("Received Token:", token);

  // 1. You created this, but weren't using it below!
  const publicKey = process.env.CLERK_JWT_SECRET!.replace(/\\n/g, "\n");

  // 2. Pass 'publicKey' here, NOT process.env.CLERK_JWT_SECRET
  const decodedUserPayload = jwt.verify(token, publicKey);

  console.log("Decoded Payload:", decodedUserPayload);
  return decodedUserPayload;
};
