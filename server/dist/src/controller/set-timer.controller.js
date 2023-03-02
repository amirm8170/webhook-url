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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTimerController = void 0;
const webhook_request_controller_1 = require("./webhook-request.controller");
const error_middleware_1 = require("../middleware/error.middleware");
const url_model_1 = require("../model/url.model");
const setTimerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, url_model_1.validateData)(req.body);
    try {
        if (error) {
            throw new error_middleware_1.CustomError(400, error.message);
        }
        else {
            const { hours, minutes, seconds } = req.body;
            const expireTime = new Date(Date.now() + (hours * 3600 + minutes * 60 + seconds) * 1000);
            const newUrl = new url_model_1.WebhookUrl({
                expireTime,
                webhookUrl: req.body.webhookUrl,
            });
            yield newUrl.save();
            yield (0, webhook_request_controller_1.webhookUrlRequest)();
            return res.status(201).json({ id: newUrl._id });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.setTimerController = setTimerController;
