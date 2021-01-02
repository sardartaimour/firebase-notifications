import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class NotificationService
{
    public notifications: Subject<any>;
    
    constructor(
        private angularFireMessaging: AngularFireMessaging
    ) {
        this.notifications = new Subject();
        // this.angularFireMessaging.messaging.subscribe(
        //     (_messaging) => {
        //         console.log('fire base message=> ', _messaging)
        //         _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        //         _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        //         // _messaging.setBackgroundMessageHandler(this.backgroundMessageHandler);
        //     });
        
        // this.angularFireMessaging.messaging.subscribe(
        //     (_messaging) => {
        //         console.log('fire base message=> ', _messaging)
        //         _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        //         _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        //         // _messaging.setBackgroundMessageHandler(this.backgroundMessageHandler);
        //     });

        this.angularFireMessaging.messages.subscribe(
            (payload) => {
                console.log("new message received. ", payload);
                const NotificationOptions = {
                        body: payload['notification'].body,
                        data: payload['data'],
                        icon: payload['notification'].icon
                      }
                      navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope').then(registration => {
                        registration.showNotification(payload['notification'].title, NotificationOptions);
                      });
                this.notifications.next(payload);
            })

        this.angularFireMessaging.messaging.subscribe(this.foregroundMessageHandler);
    }

    foregroundMessageHandler = (payload: any) => {

        console.log('[Notification] Received foreground message ', payload);

            this.handleNotifications(payload);

            // Customize notification here

            // const notification = new Notification(payload.notification.title, {
            //     icon: payload.notification.icon,
            //     body: payload.notification.body,
            // });

            // notification.onclick = () => {
            //     // window.open(payload.notification.click_action, '_self');
            //     notification.close();
            // };

    }

    backgroundMessageHandler = (payload: any) => {

        console.log('[Notification] Received background message ', payload);

        this.handleNotifications(payload);

        // Customize notification here

        // var notificationTitle = payload.title;
        // var notificationOptions = {
        //     body: payload.body,
        //     icon: payload.icon
        // };
        // return self.registration.showNotification(notificationTitle, notificationOptions);
    }

    handleNotifications(payload: any) {
        console.log('payload=> ', payload)
        const data = payload.data;
        this.notifications.next(data);        
    }

    /**
     * request permission for notification from firebase cloud messaging
     *
     */
    requestPermission()
    {
        try
        {
            this.angularFireMessaging.requestToken.subscribe((token) =>
            {
                console.log('token -> ', token);
                this.updateFCMToken(token);
            },
            (err) =>
            {
                console.error('Unable to get permission to notify.', err);
            });
        }
        catch(e)
        {

        }
    }

    public updateFCMToken(token: string)
    {
       
    }
}
