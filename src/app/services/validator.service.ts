import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ValidatorService {
  public isEmailValid(email) {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return regEx.test(email);
  }

  public isPasswordValid(password) {
    const regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    return regEx.test(password);
  }

  public isNameOrLastNameValid(name) {
    const regEx = /^[a-zA-Z]*$/;

    return regEx.test(name) && name.length > 0;
  }
}
