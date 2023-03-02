import mongoose from "mongoose";
import { CustomError } from "./../middleware/error.middleware";
import { WebhookUrl } from "./../model/url.model";
import { RequestHandler } from "express";

interface IWebhook {
  expireTime: number;
}

export const getTimerStatusController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    //find url with params (:id) from db
    const { id } = req.params;
    const validId = mongoose.isValidObjectId(id);

    // if params is null
    if (!id) {
      throw new CustomError(400, "id is required as params!");
    }
    //check if ID is invalid type, it should be objectId type. its ID type of mongodb
    if (!validId) {
      throw new CustomError(404, "Invalid ID!");
    }
    const webhook: IWebhook | null = await WebhookUrl.findById(id, {
      expireTime: 1,
      _id: 1,
    });
    //if there isn't any data with this id in db return error
    if (!webhook) {
      throw new CustomError(404, `${id} not found!`);
    }
    if (webhook!.expireTime - Date.now() < 0) {
      return res.status(200).json({ secondsLeft: 0 });
    }
    return res.status(200).json({
      secondsLeft: Math.floor(
        Math.max(0, (webhook!.expireTime - Date.now()) / 1000)
      ),
    });
  } catch (error) {
    next(error);
  }
};
