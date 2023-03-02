"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
const errorMiddleware = (err, req, res, next) => {
    console.log(err.stack);
    const statusCode = err.statusCode || 500;
    const messageError = err.message || "something went wrong!";
    return res.status(statusCode).json({ error: { statusCode, messageError } });
};
exports.errorMiddleware = errorMiddleware;
