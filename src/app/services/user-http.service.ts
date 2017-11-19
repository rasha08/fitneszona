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
      return this._http
        .get(`https://fitneszona.rs/api/users/${data.id}`)
        .map(result => result.json(), error => console.error(error));
    } else {
      const dataString = JSON.stringify(data);

      return this._http
        .post(`https://fitneszona.rs/api/users/login`, data)
        .map(result => result.json(), error => console.error(error));
    }
  }

  public resetPassword(data) {
    return this._http
      .post(`https://fitneszona.rs/api/users/reset-password`, data)
      .map(result => result.json(), error => console.error(error));
  }

  public registerUser(userObj) {
    return this._http
      .post(`${this.BASE_URL}/users`, userObj)
      .map(response => response.json());
  }

  public initilaiseUserTagsInLeftSidebar(id, tags) {
    let action = {
      action: 'leftSidebarInitialization',
      options: tags
    };
    console.log(action);
    return this._http
      .post(`${this.BASE_URL}/api/users/action/${id}`, action)
      .map(response => response.json());
  }

  public replaceUserTagInSidebar(id, tag, index) {
    let action = {
      action: 'leftSidebarChange',
      optionName: tag,
      optionIndex: index
    };
    return this._http
      .post(`${this.BASE_URL}/api/users/action/${id}`, action)
      .map(response => response.json());
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
            }, 100)
          )
      )
      .subscribe();
  }
}
