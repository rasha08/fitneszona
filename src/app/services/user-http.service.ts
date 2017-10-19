import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class UserHTTPService {
  private BASE_URL = 'https://fitneszona.rs';
  constructor(private _http: Http) {}

  public getUserData(data, isUserRemembered?) {
    if (isUserRemembered) {
      return this._http
        .get(`${this.BASE_URL}/users/${data.id}`)
        .map(result => result.json(), error => console.error(error));
    } else {
      const dataString = JSON.stringify(data);

      return this._http
        .post(`${this.BASE_URL}/api/users/login`, data)
        .map(result => result.json(), error => console.error(error));
    }
  }

  public resetPassword(data) {
    return this._http
      .post(`${this.BASE_URL}/api/users/reset-password`, data)
      .map(result => result.json(), error => console.error(error));
  }
}
