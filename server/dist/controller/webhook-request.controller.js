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
exports.webhookUrlRequest = void 0;
const url_model_1 = require("./../model/url.model");
// this function is handling count down timer and after expire time sends post request to webhookUrl/:_id
const webhookUrlRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const webhookUrls = yield url_model_1.WebhookUrl.find({ expireTime: { $gt: new Date(Date.now()) } }, { expireTime: 1, _id: 1, webhookUrl: 1 });
        //setTimeout to send request to the webhookUrl.It's clear :)
        webhookUrls.forEach((data) => {
            let { expireTime, webhookUrl, _id } = data;
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                yield fetch(`${data.webhookUrl}/${_id}`, {
                    method: "POST",
                }).catch((err) => console.log(err));
            }), data.expireTime - Date.now());
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.webhookUrlRequest = webhookUrlRequest;
