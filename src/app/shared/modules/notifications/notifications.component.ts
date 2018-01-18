import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Scheduler } from 'rxjs/Scheduler';

import { AuthService } from '../../../services/auth.service';
import { UserDataService } from '../../../services/user-data.service';
import { UserNotifyService } from '../../../services/user-notify.service';
declare const $: any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.html'
})
export class NotificationsComponent
  implements OnInit, OnDestroy, AfterViewInit {
  private _updateCouner = 0;
  private _activeNotifications: Array<any> = [];
  private _subscriptions = [];
  public notifications = [];
  private _isNotificationActive = false;

  constructor(
    private _authService: AuthService,
    private _userDataService: UserDataService,
    private _userNotifyService: UserNotifyService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._subscribeToUserNotificationChange();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _subscribeToUserNotificationChange() {
    this._subscriptions.push(
      this._authService.userNotificationChange.subscribe(notification => {
        console.log(notification);
        this.notifications.push(notification);
        this._isNotificationActive = false;
        this._changeDetectorRef.detectChanges();
        setTimeout(() => {
          this._isNotificationActive = true;
          this._changeDetectorRef.detectChanges();
        }, 300);
      })
    );

    this._subscriptions.push(
      this._authService.authStatusChange$.subscribe(status => {
        if (status) {
          this.notifications = this._userDataService.getUserNotifications();
          console.log(this.notifications);
          this._changeDetectorRef.detectChanges();
          setTimeout(() => {
            this._isNotificationActive = true;
            this._changeDetectorRef.detectChanges();
          });
        }
      })
    );
  }

  ngAfterViewInit() {}

  closeNotification(notification) {
    const notificationIndex = this.notifications.findIndex(
      notificationInArray => notification.id === notificationInArray.id
    );
    this._userNotifyService.clearNotification(notification.id);
    this.notifications.splice(notificationIndex, 1);
    this._isNotificationActive = this.notifications.length ? true : false;
    this._changeDetectorRef.detectChanges();
  }

  isNotifications() {
    return this._isNotificationActive;
  }

  getNotifications(status) {
    if (status === true) {
      this.notifications = this._userDataService.getUserNotifications();
      console.log(this.notifications);
    } else {
      this.notifications = [];
    }
  }
}
