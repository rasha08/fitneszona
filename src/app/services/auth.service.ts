import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { UserHTTPService } from "./user-http.service";
import { ResponseService } from "./response.service";

@Injectable()
export class AuthService {
  private _user;

  private _authStatusChange = new Subject();
  public authStatusChange$ = this._authStatusChange.asObservable();

  constructor(
    private _userHTTPService: UserHTTPService,
    private _responseService: ResponseService
  ) {}

  public getUser() {
    return this._user;
  }

  public checkIfUserIsLoggedIn() {
    if (localStorage.getItem("rememberUser")) {
      let id = localStorage.getItem("rememberUser");
      let data = {
        id
      };

      this._userHTTPService.getUserData(data, true).subscribe(
        response => {
          this._user = response;
          if (this._user) {
            this._changeAuthStatus();
          }

          return {};
        },
        error => console.error(error)
      );
    }
  }

  public logout() {
    this._user = null;
    this._changeAuthStatus();
  }

  public login(data, rememberMe) {
    this._userHTTPService.getUserData(data).subscribe(response => {
      console.log(response);
      if (response.status === "not existing user") {
        console.error("not existing user");
        return;
      } else if (response.status === "wrong password") {
        console.error("wrong password");
        return;
      }

      this._user = response;
      if (rememberMe) {
        localStorage.setItem("rememberUser", this._user.id);
      }
      this._changeAuthStatus();
    });
  }

  public resetPassword(email) {
    let data = {
      email
    };

    this._userHTTPService.resetPassword(data).subscribe(response => {
      this._responseService.handleResponse(response);
    });
  }

  private _changeAuthStatus() {
    this._authStatusChange.next();
  }
}
