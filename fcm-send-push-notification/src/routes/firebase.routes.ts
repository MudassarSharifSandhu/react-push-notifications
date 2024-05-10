import { Router } from "express";
import PushNotificationController from "../controllers/PushNotificationController";

const firebaseRouter = Router();

firebaseRouter.post(
  "/sendNotification",
  PushNotificationController.sendNotification
);

export default firebaseRouter;
