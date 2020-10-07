/* eslint-disable */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');



const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'abigo-share.firebaseapp.com',
    databaseURL: 'https://abigo-share.firebaseio.com',
    projectId: 'abigo-share',
    storageBucket: 'abigo-share.appspot.com',
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASURMENT_ID,
};
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const parsed = JSON.parse(payload.data.body);
    // Customize notification here
    const notificationTitle = "New message on relp";
    const notificationOptions = {
        body: `You got a new message from ${parsed.displayName}`,
        icon: parsed.photoURL,
        vibrate: [300, 100, 400, 100, 400, 100, 400],
        data: { url: `http://localhost:3000/r/${parsed.channel}` },
        actions: [{ action: "open_url", title: "Read Message" }],
        click_action: `http://localhost:3000/r/${parsed.channel}`
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});