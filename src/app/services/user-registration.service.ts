import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { UserHTTPService } from "./user-http.service";

@Injectable()

export class UserRegistrationService{ 
    private response = new Subject();
    public response$ = this.response.asObservable();

    constructor(
        private _userHTTPService: UserHTTPService
    ) { }

    registerUser(userObj){ 
        this._userHTTPService.registerUser(userObj).subscribe(
            result => this.sendResponseToUserRegistration(result.json()),
            error => console.log(error)
        )
    }

    sendResponseToUserRegistration(response){
        this.response.next(response);
    }
}
