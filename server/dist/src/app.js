"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const error_middleware_1 = require("./middleware/error.middleware");
const router_1 = require("./router/router");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use((0, helmet_1.default)());
exports.app.use((0, morgan_1.default)("combined"));
exports.app.use(express_1.default.json());
exports.app.use("/", router_1.router);
exports.app.use(error_middleware_1.errorMiddleware);
