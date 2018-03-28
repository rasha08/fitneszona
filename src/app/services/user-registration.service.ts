import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserHTTPService } from './user-http.service';
import { ResponseService } from './response.service';

@Injectable()
export class UserRegistrationService {
  constructor(
    private _userHTTPService: UserHTTPService,
    private _responseService: ResponseService
  ) {}

  registerUser(userObj) {
    this._userHTTPService
      .registerUser(userObj)
      .subscribe(
        result => this._responseService.handleResponse(result),
        error => {}
      );
  }
}
