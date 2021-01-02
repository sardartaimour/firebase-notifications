importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyC56qKypnJgM6MNa63lXuFHiQ7ogGew9Fw",
    authDomain: "pos-notifications-c4a42.firebaseapp.com",
    projectId: "pos-notifications-c4a42",
    storageBucket: "pos-notifications-c4a42.appspot.com",
    messagingSenderId: "533919698271",
    appId: "1:533919698271:web:02dc93b5a628279f09baea",
    measurementId: "G-TBDQXKZ6JN"

});

const messaging = firebase.messaging();

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(self.clients.openWindow(event.notification.data.url));
});

// messaging.setBackgroundMessageHandler((payload) => {

//     console.log('[firebase-messaging-sw.js] FIR MES in BG ', payload);

//     // Customize notification here

//     // var notificationTitle = payload.title;
//     // var notificationOptions = {
//     //     body: payload.body,
//     //     icon: payload.icon
//     // };
//     // return self.registration.showNotification(notificationTitle, notificationOptions);
// });
