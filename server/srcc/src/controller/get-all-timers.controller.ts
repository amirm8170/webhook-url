import { WebhookUrl } from "./../model/url.model";
import { RequestHandler } from "express";

interface IResult {
  secondsLeft: number;
  _id: string;
  webhookUrl: string;
}
let result: IResult[] = [];

export const getAllTimersController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    // get all webhook urls with details from db.
    const webhooks = await WebhookUrl.find(
      { expireTime: { $gte: new Date(Date.now()) } },
      { expireTime: 1, _id: 1, webhookUrl: 1 }
    );
    // convert time to second, get ID and save them in another object to return in response
    webhooks.forEach((data: any) => {
      const secondsLeft: number = Math.floor(
        Math.max((data.expireTime - Date.now()) / 1000)
      );
      const _id = data._id;

      const webhookUrl = data.webhookUrl;

      const object = { secondsLeft, _id, webhookUrl };

      result.push(object);
    });

    res.status(200).json(result);
    result = [];
    return;
  } catch (error) {
    next(error);
  }
};
