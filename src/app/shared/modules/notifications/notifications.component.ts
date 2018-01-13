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
  constructor(
    private _authService: AuthService,
    private _notifyService: NotifyService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._subscribeToUserStatusChange();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _subscribeToUserStatusChange() {
    this._subscriptions.push(
      this._authService.authStatusChange$.subscribe(status => {
        if (true) {
          this._notifyService
            .subscribeToUserChanges(
              this._authService.getUser()['subscriptionId']
            )
            .on('value', update => {
              const updateObj = update.val();
              this._updateCouner += 1;
              if (this._shouldFetchNotifications(updateObj['type'])) {
              }
            });
        }
      })
    );
  }

  ngAfterViewInit() {}

  private _shouldFetchNotifications(type): boolean {
    return this._updateCouner > 1 && type === 'notification';
  }
}
