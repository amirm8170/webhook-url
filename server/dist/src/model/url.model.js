"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookUrl = exports.validateData = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const urlSchema = new mongoose_1.Schema({
    expireTime: { type: Number, required: true, min: 0 },
    webhookUrl: { type: String, required: true },
}, { timestamps: true });
const validateData = (urlInformation) => {
    const schema = joi_1.default.object({
        hours: joi_1.default.number().required().min(0),
        minutes: joi_1.default.number().required().max(60).min(0),
        seconds: joi_1.default.number().required().min(0).max(60),
        webhookUrl: joi_1.default.string().required(),
    });
    return schema.validate(urlInformation);
};
exports.validateData = validateData;
exports.WebhookUrl = mongoose_1.default.model("urls", urlSchema);
