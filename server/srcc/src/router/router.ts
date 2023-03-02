import { getAllTimersController } from "./../controller/get-all-timers.controller";
import { setTimerController } from "../controller/set-timer.controller";
import { Router } from "express";
import { getTimerStatusController } from "../controller/get-timer-status.controller";

export const router = Router();

router.post("/set-timer", setTimerController);
router.get("/get-timer-status/:id", getTimerStatusController);
router.get("/get-all-timers", getAllTimersController);
