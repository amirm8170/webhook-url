import { errorMiddleware } from "./middleware/error.middleware";
import { router } from "./router/router";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express, { Request, Response } from "express";
import path from "path";

export const app = express();

app.use(cors<Request>());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", router);

app.get("/*", (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(errorMiddleware);
