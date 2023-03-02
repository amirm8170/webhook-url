import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";

const urlSchema = new Schema(
  {
    expireTime: { type: Number, required: true, min: 0 },
    webhookUrl: { type: String, required: true },
  },
  { timestamps: true }
);
// validate req.body first of all with Joi.
export const validateData = (urlInformation: Document) => {
  const schema = Joi.object({
    hours: Joi.number().required().min(0),
    minutes: Joi.number().required().max(60).min(0),
    seconds: Joi.number().required().min(0).max(60),
    webhookUrl: Joi.string().required(),
  });
  return schema.validate(urlInformation);
};

export const WebhookUrl = mongoose.model<Document>("urls", urlSchema);
