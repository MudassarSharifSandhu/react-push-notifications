/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyCbmu5QHcSPbA38p25yY6FcB4Dv9L8lJjg",
    authDomain: "testing-app-1e84f.firebaseapp.com",
    projectId: "testing-app-1e84f",
    storageBucket: "testing-app-1e84f.appspot.com",
    messagingSenderId: "6291653461",
    appId: "1:6291653461:web:1020e75e60f6fe30ad25dc",
    measurementId: "G-JCZLXLD1QL"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
console.log("messaging", messaging);

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
