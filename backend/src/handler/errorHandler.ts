import { Response, Request } from "express";

export const errorHandler = (
  res: Response,
  status: number,
  message: string,
) => {
  return res.status(status).json({
    success: false,
    message,
    // path: req.baseUrl,
  });
};
