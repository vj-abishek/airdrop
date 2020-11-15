/* eslint-disable */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

importScripts('crypto.min.js');
importScripts('https://unpkg.com/dexie@3.0.2/dist/dexie.js');


const db = new Dexie('user_database');
db.version(1).stores({
    channel: 'id',
});

const getKeys = async (channelId) => {
    return new Promise((res, rej) => {
        try {
            db.channel
                .where('id')
                .equalsIgnoreCase(channelId)
                .toArray()
                .then((key) => {
                    if (key) {
                        const { SharedSecret } = key[0];
                        res(SharedSecret);
                    }

                });
        } catch (err) {
            rej(err);
        }
    });
}


const firebaseConfig = {
    apiKey: "AIzaSyC9Cy-mfY_ZQQS6UK9G6dv42GglYT0ftws",
    authDomain: 'abigo-share.firebaseapp.com',
    databaseURL: 'https://abigo-share.firebaseio.com',
    projectId: 'abigo-share',
    storageBucket: 'abigo-share.appspot.com',
    messagingSenderId: "545112504838",
    appId: "1:545112504838:web:9b145eef919fd2988ce187",
    measurementId: "G-F5TTLBY3M2",
};
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

self.addEventListener('notificationclick', function (event) {
    const clickedNotification = event.notification;

    const promiseChain = clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    })
        .then((windowClients) => {
            let matchingClient = null;

            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url.includes(`${self.location.origin}`)) {
                    matchingClient = windowClient;
                    break;
                }
            }

            if (matchingClient) {
                matchingClient.postMessage({
                    url: clickedNotification.data.url,
                });
                return matchingClient.focus();
            } else {
                return clients.openWindow(clickedNotification.data.url);
            }
        });

    clickedNotification.close();

    event.waitUntil(promiseChain);
});



messaging.setBackgroundMessageHandler(async function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const parsed = JSON.parse(payload.data.body);

    try {
        const SharedSecret = await getKeys(parsed.channel);
        const decMessage = Decrypt(SharedSecret, parsed.body);
        const decParsed = JSON.parse(decMessage);
        // Customize notification here
        const notificationTitle = `${parsed.displayName}`;
        const notificationOptions = {
            body: `${decParsed.message}`,
            icon: parsed.photoURL,
            vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500],
            data: { url: `r/${parsed.channel}` },
            actions: [{ action: 'open_url', title: 'Read Message' }],
            click_action: `${self.location.origin}/r/${parsed.channel}`,
            tag: parsed.channel,
            renotify: true,
            requireInteraction: true,
            badge: 'badge-128x128.png',
        };
        return self.registration.showNotification(notificationTitle, notificationOptions);

    } catch (err) {
        console.log(err);
    }
});