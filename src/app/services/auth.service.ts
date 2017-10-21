import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { UserHTTPService } from "./user-http.service";
import { ResponseService } from "./response.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AuthService {
  private _user;

  private _authStatusChange = new Subject();

  public authStatusChange$ = this._authStatusChange.asObservable();

  constructor(
    private _userHTTPService: UserHTTPService,
    private _responseService: ResponseService,
    private _localStorageService: LocalStorageService
  ) {}

  public getUser() {
    return this._user;
  }

  public checkIfUserIsLoggedIn() {
    if (this._localStorageService.getKeyIfExists("rememberUser")) {
      const id = this._localStorageService.getKeyIfExists("RememberUser");
      const data = {
        id
      };

      this._userHTTPService.getUserData(data, true).subscribe(
        response => {
          this._user = response;
          if (this._user) {
            this._localStorageService.setUserLastVist(this._user);
            this._changeAuthStatus();
          }

          return {};
        },
        error => console.error(error)
      );
    }
  }

  public logout() {
    this._localStorageService.setUserLastVist(this._user);
    this._user = null;
    this._changeAuthStatus();
  }

  public login(data, rememberMe) {
    this._userHTTPService.getUserData(data).subscribe(response => {
      if (response.status) {
        console.log("RESPONSE STATUS: ", response.status);
        this._responseService.handleResponse(response);

        return;
      }

      this._user = response;
      if (rememberMe) {
        localStorage.setItem("rememberUser", this._user.id);
      }
      this._changeAuthStatus();
      this._responseService.handleResponse({ status: "login success" });
      this._localStorageService.setUserLastVist(this._user);
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

  private _changeAuthStatus() {
    this._authStatusChange.next();
  }
}
