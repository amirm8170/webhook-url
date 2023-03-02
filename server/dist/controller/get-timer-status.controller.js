"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimerStatusController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const error_middleware_1 = require("./../middleware/error.middleware");
const url_model_1 = require("./../model/url.model");
const getTimerStatusController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //find url with params (:id) from db
        const { id } = req.params;
        const validId = mongoose_1.default.isValidObjectId(id);
        // if params is null
        if (!id) {
            throw new error_middleware_1.CustomError(400, "id is required as params!");
        }
        //check if ID is invalid type, it should be objectId type. its ID type of mongodb
        if (!validId) {
            throw new error_middleware_1.CustomError(404, "Invalid ID!");
        }
        const webhook = yield url_model_1.WebhookUrl.findById(id, {
            expireTime: 1,
            _id: 1,
        });
        //if there isn't any data with this id in db return error
        if (!webhook) {
            throw new error_middleware_1.CustomError(404, `${id} not found!`);
        }
        if (webhook.expireTime - Date.now() < 0) {
            return res.status(200).json({ secondsLeft: 0 });
        }
        return res.status(200).json({
            secondsLeft: Math.floor(Math.max(0, (webhook.expireTime - Date.now()) / 1000)),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getTimerStatusController = getTimerStatusController;
