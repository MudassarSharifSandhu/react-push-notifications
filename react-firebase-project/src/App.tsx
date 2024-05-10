import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BellIcon from "./BellIcon";
import "../src/App.css";
import NotificationDropdown from "./NotificationDropdown";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbmu5QHcSPbA38p25yY6FcB4Dv9L8lJjg",
  authDomain: "testing-app-1e84f.firebaseapp.com",
  projectId: "testing-app-1e84f",
  storageBucket: "testing-app-1e84f.appspot.com",
  messagingSenderId: "6291653461",
  appId: "1:6291653461:web:1020e75e60f6fe30ad25dc",
  measurementId: "G-JCZLXLD1QL",
};

initializeApp(firebaseConfig);
const messaging = getMessaging();

const App: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<string[]>([]);

  let token: any;

  const generateToken = async () => {
    const persmission = await Notification.requestPermission();
    console.log("persmission", persmission);
    if (persmission === "granted") {
      token = await getToken(messaging, {
        vapidKey:
          "BBIPAhpDYgKWtsi2KkBPNk4fDVlMaMcImAq9LxScLve0DeQOW_hK3v53o5PdPgeHDR1gnDxgdP_cnYOiREeK9Ig",
      });
      console.log("token", token);
    }
  };

  const handleButtonClick = async (btn: string) => {
    // Send a message to FCM with button text as payload
    try {
      await fetch("http://localhost:3333/firebase/sendNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAAAXcDA1U:APA91bHRru6zzHu4zl9lMyAYIVvAJ8wxJggEZw86kKX1my4DEbNEffG_vS1jgwjeN4k5-PINqKi91713FW1d7cievX88W-9EpaO-zCPf79PdlnhcpMk3PqFMxHRvgt4E_S6zeumG2Rsi", // Replace with your server key
        },
        body: JSON.stringify({
          data: {
            title: "New Notification",
            body: `Button ${btn} pressed`,
            sendToSpecificDeviceToken:
              "fSudGBpcSoGBNVtGMzg88x:APA91bHRwvHMx-P76_fdmH82KKopYgUWarlNzsYSwkiqKI_hrRpYEj-NDqePXPZ_coIe6AiLo7LpcHXeSIxr5pWy4l0p1tOhADWSJUdh3Orvz0wtFOCjwAIrU4VzFgJq_COhKcTcJRTW",
            sendToTopic: "topic_example",
          },
        }),
      });
    } catch (error) {
      console.error("Error sending message to FCM:", error);
    }
  };

  const markAsRead = (index: number) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.length);
  };

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload: any) => {
      const newNotification = payload.data?.body;
      console.log("newNotification", newNotification);
      if (newNotification) {
        setNotifications([...notifications, newNotification]);
        setUnreadCount(unreadCount + 1);
        toast(newNotification, { autoClose: 2000 });
      }
    });
  }, [notifications, unreadCount]);

  return (
    <div className="app-container">
      <div className="buttons-container">
        <button onClick={() => handleButtonClick("1")}>Button 1</button>
        <button onClick={() => handleButtonClick("2")}>Button 2</button>
        <button onClick={() => handleButtonClick("3")}>Button 3</button>
      </div>
      <BellIcon unreadCount={unreadCount} />
      <ToastContainer
        toastStyle={{
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
        }}
      />
      <NotificationDropdown
        notifications={notifications}
        markAsRead={markAsRead}
      />
    </div>
  );
};

export default App;
