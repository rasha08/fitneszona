import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserHTTPService {
  private BASE_URL = 'https://fitneszona.rs';
  constructor(private _http: Http, private _ngZone: NgZone) {}

  public getUserData(data, isUserRemembered?) {
    if (isUserRemembered) {
      return this._http.get(`https://fitneszona.rs/api/users/${data.id}`).map(
        result => result.json(),
        error => {
          this._ngZone.runOutsideAngular(() => {
            setTimeout(() => this.getUserData(data, isUserRemembered), 300);
          });
        }
      );
    } else {
      const dataString = JSON.stringify(data);

      return this._http.post(`https://fitneszona.rs/api/users/login`, data).map(
        result => result.json(),
        error => {
          this._ngZone.runOutsideAngular(() => {
            setTimeout(() => this.getUserData(data, isUserRemembered), 300);
          });
        }
      );
    }
  }

  public resetPassword(data) {
    return this._http
      .post(`https://fitneszona.rs/api/users/reset-password`, data)
      .map(
        result => result.json(),
        error => {
          this._ngZone.runOutsideAngular(() => {
            setTimeout(() => this.resetPassword(data), 300);
          });
        }
      );
  }

  public registerUser(userObj) {
    return this._http
      .post(`${this.BASE_URL}/users`, userObj)
      .map(response => response.json());
  }

  public initilaiseUserTagsInLeftSidebar(id, tags) {
    const action = {
      action: 'leftSidebarInitialization',
      options: tags
    };
    return this._http
      .post(`${this.BASE_URL}/api/users/action/${id}`, action)
      .map(
        response => response.json(),
        error => {
          this._ngZone.runOutsideAngular(() => {
            setTimeout(
              () => this.initilaiseUserTagsInLeftSidebar(id, tags),
              300
            );
          });
        }
      );
  }

  public replaceUserTagInSidebar(id, tag, index) {
    const action = {
      action: 'leftSidebarChange',
      optionName: tag,
      optionIndex: index
    };
    return this._http
      .post(`${this.BASE_URL}/api/users/action/${id}`, action)
      .map(
        response => response.json(),
        error => {
          this._ngZone.runOutsideAngular(() => {
            setTimeout(() => this.replaceUserTagInSidebar(id, tag, index), 300);
          });
        }
      );
  }

  public action(body, id) {
    return this._http
      .post(`https://fitneszona.rs/api/users/action/${id}`, body)
      .map(
        response => response.json(),
        error =>
          this._ngZone.runOutsideAngular(() =>
            setTimeout(() => {
              this.action(body, id);
            }, 300)
          )
      )
      .subscribe();
  }

  public setUserConfiguration(configuration, id) {
    console.log(configuration);
    return this._http
      .post(
        `${this.BASE_URL}/api/users/user-configuration/${id}/update-or-create`,
        configuration
      )
      .map(response => response.json(), error => {});
  }
}
