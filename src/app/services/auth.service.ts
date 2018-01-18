import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UserHTTPService } from './user-http.service';
import { ResponseService } from './response.service';
import { LocalStorageService } from './local-storage.service';
import { ConfigurationService } from './configuration.service';
import { NotifyService } from './notify.service';

@Injectable()
export class AuthService {
  private _isCheckedIsUserLoggedIn = false;
  private _user;
  private _updateCouner = 0;
  private _subscribed = false;
  public isUserLoggedIn = false;

  private _authStatusChange = new Subject();
  public authStatusChange$ = this._authStatusChange.asObservable();
  private _userDataChange = new Subject();
  public userDataChange$ = this._userDataChange.asObservable();
  private _userNotificationChange = new Subject();
  public userNotificationChange = this._userNotificationChange.asObservable();

  constructor(
    private _userHTTPService: UserHTTPService,
    private _responseService: ResponseService,
    private _localStorageService: LocalStorageService,
    private _ngZone: NgZone,
    private _configurationService: ConfigurationService,
    private _notifyService: NotifyService
  ) {
    this._configurationService.configurationStatusChange$.subscribe(() => {
      this._ngZone.runOutsideAngular(() =>
        setTimeout(() => {
          if (!this._isCheckedIsUserLoggedIn) {
            this.checkIfUserIsLoggedIn();
          }
        }, 1500)
      );
    });
  }

  public getUser() {
    return this._user;
  }

  public checkIfUserIsLoggedIn() {
    this._isCheckedIsUserLoggedIn = true;
    if (this._localStorageService.getKeyIfExists('rememberUser')) {
      const id = this._localStorageService.getKeyIfExists('rememberUser');
      const data = {
        id
      };

      this._getUserData(data);
    }
  }

  private _getUserData(data) {
    this._userHTTPService.getUserData(data, true).subscribe(
      response => {
        this._user = response;
        if (this._user && !this._user.status) {
          this.isUserLoggedIn = true;
          this._changeAuthStatus(true);
          this._subscribeToUserDataChanges();
        }

        return {};
      },
      error =>
        this._ngZone.runOutsideAngular(() =>
          setTimeout(() => this._getUserData(data), 600)
        )
    );
  }
  public logout() {
    console.log(this._user);
    this._localStorageService.setUserLastVist(this._user);
    this._user = null;
    localStorage.removeItem('rememberUser');
    this.isUserLoggedIn = false;
    this._changeAuthStatus(false);
    this._subscribed = false;
    this._updateCouner = 0;
  }

  public login(data, rememberMe) {
    this._userHTTPService.getUserData(data).subscribe(response => {
      if (response.status) {
        this._responseService.handleResponse(response);

        return;
      }

      this._user = response;
      if (rememberMe) {
        localStorage.setItem('rememberUser', this._user.id);
      }
      this._changeAuthStatus(true);
      this._responseService.handleResponse({ status: 'login success' });
      this._subscribeToUserDataChanges();
    });
  }

  public resetPassword(email) {
    const data = {
      email
    };

    this._userHTTPService.resetPassword(data).subscribe(response => {
      this._responseService.handleResponse(response);
    });
  }

  private _changeAuthStatus(isLoggedIn) {
    this._authStatusChange.next(isLoggedIn);
  }

  private _subscribeToUserDataChanges() {
    if (this._subscribed) {
      return;
    }

    this._notifyService
      .subscribeToUserChanges(this._user.subscriptionId)
      .on('value', update => {
        this._updateCouner += 1;
        if (!this._shouldUpdate()) {
          return;
        }

        let updateObj = update.val();
        let canParseJSON = true;

        do {
          try {
            updateObj = JSON.parse(updateObj);
          } catch (e) {
            canParseJSON = false;
          }
        } while (canParseJSON);

        if (updateObj.type === 'notification') {
          this._userNotificationChange.next(updateObj.payload);
        } else if (updateObj.payload) {
          Object.assign(this._user, updateObj.payload);
          this._userDataChange.next();
        }
      });
  }

  private _shouldUpdate() {
    return this._updateCouner > 1;
  }
}
