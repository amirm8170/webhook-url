import { webhookUrlRequest } from "./webhook-request.controller";
import { Document } from "mongoose";
import { CustomError } from "../middleware/error.middleware";
import { validateData, WebhookUrl } from "../model/url.model";
import { RequestHandler } from "express";

export const setTimerController: RequestHandler = async (req, res, next) => {
  // check data from body is validate or no. its checking with joi. and return err if it has error
  const { error } = validateData(req.body);
  try {
    if (error) {
      throw new CustomError(400, error.message);
    } else {
      //validate body has true hours minutes and seconds and also webhookUrl to save in db.
      const { hours, minutes, seconds } = req.body;
      const expireTime = new Date(
        Date.now() + (hours * 3600 + minutes * 60 + seconds) * 1000
      );

      const newUrl: Document = new WebhookUrl({
        expireTime,
        webhookUrl: req.body.webhookUrl,
      });
      await newUrl.save();
      //this function starts count down timer to send post request to that webhookUrl.
      await webhookUrlRequest();
      return res.status(201).json({ id: newUrl._id });
    }
  } catch (error) {
    next(error);
  }
};
