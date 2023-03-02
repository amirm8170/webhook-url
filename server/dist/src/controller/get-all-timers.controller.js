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
exports.getAllTimersController = void 0;
const url_model_1 = require("./../model/url.model");
let result = [];
const getAllTimersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const webhooks = yield url_model_1.WebhookUrl.find({ expireTime: { $gte: new Date(Date.now()) } }, { expireTime: 1, _id: 1, webhookUrl: 1 });
        webhooks.forEach((data) => {
            const secondsLeft = Math.floor(Math.max((data.expireTime - Date.now()) / 1000));
            const _id = data._id;
            const webhookUrl = data.webhookUrl;
            const object = { secondsLeft, _id, webhookUrl };
            result.push(object);
        });
        res.status(200).json(result);
        result = [];
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTimersController = getAllTimersController;
