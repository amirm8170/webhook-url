import { Response, Request, NextFunction } from "express";

// error handling is one of the most important middleware in projects.Error class has not specific statusCode so we should build customError to handle statuscode too.

export class CustomError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);

  const statusCode = (err as CustomError).statusCode || 500;
  const messageError = err.message || "something went wrong!";
  return res.status(statusCode).json({ error: { statusCode, messageError } });
};
