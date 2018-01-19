import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';
import { UtilsService } from './utils.service';
import * as get from 'lodash/get';

@Injectable()
export class UserConfigurationService {
  private _userConfigurationChange = new Subject();
  public userConfigurationChange$ = this._userConfigurationChange.asObservable();
  private _userConfiguration: any;

  constructor(
    private _authService: AuthService,
    private _notifyService: NotifyService,
    private _utilsService: UtilsService
  ) {
    this._authService.authStatusChange$.subscribe(status => {
      if (status) {
        this.subscribeToUserConfigurationChanges();
      } else {
        this._userConfigurationChange.next(null);
      }
    });
  }

  private subscribeToUserConfigurationChanges() {
    const configurationSubscriptionId = get(
      this._authService.getUser(),
      'configuration.subscriptionId'
    );

    if (!configurationSubscriptionId) {
      return;
    }

    this._notifyService
      .subscribeToUserConfigurationChanges(configurationSubscriptionId)
      .on('value', update => {
        let configurationObject = update.val();
        configurationObject = this._utilsService.parseDeepJSON(
          configurationObject
        );

        if (configurationObject && typeof configurationObject !== 'string') {
          this._userConfiguration = configurationObject;
          this._userConfigurationChange.next(true);
        }
      });
  }

  public getUserTheme() {
    return this._userConfiguration && this._userConfiguration.thema
      ? this._userConfiguration.thema
      : null;
  }
}
