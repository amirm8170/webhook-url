import { webhookUrlRequest } from "./controller/webhook-request.controller";
import { app } from "./app";
import { createServer } from "http";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
interface Config {
  PORT: number;
  MONGO: string | undefined;
}

const config: Config = {
  PORT: 4000,
  MONGO: process.env.MONGO_URI,
};

mongoose.set("strictQuery", false);

try {
  const startServer = async () => {
    mongoose.connect(config.MONGO!);
    createServer(app).listen(config.PORT);
    console.log(`server is listening on ${config.PORT}`);
    //after server restarted before everything we run this function to get active requests for client.
    await webhookUrlRequest();
  };
  startServer();
} catch (error) {
  console.log(error);
}
