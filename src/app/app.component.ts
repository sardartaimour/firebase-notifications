import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from './notificaction.service';

import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'firebase-final';
  _unsubscribeAll: Subject<any>;

  constructor(private notifService: NotificationService)
  {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit()
  {
    this.notifService.requestPermission();
    this.notifService.notifications.pipe(takeUntil(this._unsubscribeAll)).subscribe(notification =>
      {
          console.log('App component notification => ', notification);
      });
  }

  ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
