import * as admin from "firebase-admin";

interface Message {
  title: string;
  body: string;
  imageUrl?: string;
}

interface SendMessageOptions {
  sendToSpecificDeviceToken?: string;
  sendToTopic?: string;
}

export class FirebaseClient {
  public firebaseClient = !admin.apps.length
    ? admin.initializeApp({
        credential: admin.credential.cert(
          "../../testing-app-1e84f-firebase-adminsdk-q6t9g-88cf1d9489.json"
        ),
      })
    : admin;

  async sendNotification(message: Message, options: SendMessageOptions) {
    const messageData = {
      data: {},
      notification: {
        title: message.title,
        body: message.body,
      },
      token: options.sendToSpecificDeviceToken
        ? options.sendToSpecificDeviceToken
        : undefined,
    } as admin.messaging.Message;

    const response = await this.firebaseClient.messaging().send(messageData);

    return response;
  }
}
