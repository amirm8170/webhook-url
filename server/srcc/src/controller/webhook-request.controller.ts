import { WebhookUrl } from "./../model/url.model";
import { Document } from "mongoose";
import { ObjectId } from "mongoose";

interface IData extends Document {
  expireTime: number;
  webhookUrl: string;
  _id: ObjectId;
}
// this function is handling count down timer and after expire time sends post request to webhookUrl/:_id
export const webhookUrlRequest = async (): Promise<void> => {
  try {
    const webhookUrls: IData[] = await WebhookUrl.find(
      { expireTime: { $gt: new Date(Date.now()) } },
      { expireTime: 1, _id: 1, webhookUrl: 1 }
    );

    //setTimeout to send request to the webhookUrl.It's clear :)
    webhookUrls.forEach((data) => {
      let { expireTime, webhookUrl, _id } = data;
      setTimeout(async () => {
        await fetch(`${data.webhookUrl}/${_id}`, {
          method: "POST",
        }).catch((err) => console.log(err));
      }, data.expireTime - Date.now());
    });
  } catch (error) {
    console.log(error);
  }
};
