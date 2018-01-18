import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../../services/auth.service';
import { NotifyService } from '../../../services/notify.service';
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
  constructor(
    private _authService: AuthService,
    private _notifyService: NotifyService,
    private _userDataService: UserDataService,
    private _userNotifyService: UserNotifyService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._subscribeToUserStatusChange();
    this._subscribeToUserNotificationChange();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _subscribeToUserStatusChange() {
    this._subscriptions.push(
      this._authService.authStatusChange$.subscribe(status => {
        this.getNotifications(status);
        if (status) {
          this._notifyService
            .subscribeToUserChanges(
              this._authService.getUser()['subscriptionId']
            )
            .on('value', update => {
              const updateObj = update.val();
              this._updateCouner += 1;
              if (this._shouldFetchNotifications(updateObj['type'])) {
                console.log(updateObj['payload']);
              }
            });
        }
      })
    );
  }

  private _subscribeToUserNotificationChange() {
    this._subscriptions.push(
      this._authService.userNotificationChange.subscribe(
        notification => {
          console.log(notification);
          this.notifications.push(notification);
        }
      )
    )
  }

  ngAfterViewInit() {}

  private _shouldFetchNotifications(type): boolean {
    return this._updateCouner > 1 && type === 'notification';
  }

  closeNotification(notification) {
    const notificationIndex = this.notifications.findIndex(
      (notificationInArray) => notification.id === notificationInArray.id
    );
    this._userNotifyService.clearNotification(notification.id);
    this.notifications.splice(notificationIndex, 1);
  }

  isNotifications() {
    return this.notifications.length > 0;
  }

  getNotifications(status) {
    if (status === true) {
      this.notifications = this._userDataService.getUserNotifications();
      console.log(this.notifications);
    }else {
      this.notifications = [];
    }
  }

}
