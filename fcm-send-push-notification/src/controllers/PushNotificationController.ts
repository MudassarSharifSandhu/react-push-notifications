import { Request, Response } from "express";
import { FirebaseClient } from "../services/firebaseClient";
import { chunk } from "../utils/chunk";

interface SendNotificationBody {
  title: string;
  body: string;
  // imageUrl?: string;
  // sendToTopic?: string;
  sendToSpecificDeviceToken?: string;
}

export default new (class PushNotificationController {
  async sendNotification(req: Request, res: Response) {
    console.log(req.body);
    const { title, body, sendToSpecificDeviceToken } =
      req.body as SendNotificationBody;

    try {
      const response = await new FirebaseClient().sendNotification(
        { title, body },
        { sendToSpecificDeviceToken }
      );

      if (response) {
        return res.json({ message: "Push notification has been sent!" });
      }

      return res.status(400).json({ message: response });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();
