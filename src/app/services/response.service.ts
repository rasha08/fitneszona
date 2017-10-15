import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { AlertService } from "./alert.service";

@Injectable()
export class ResponseService {
  private _errorHandler = new Subject();
  public errorHandler$ = this._errorHandler.asObservable();

  constructor(private _alertService: AlertService) {}

  public handleResponse(errorObject) {
    const status = errorObject.status;
    let message = {
      type: "",
      title: "",
      body: ""
    };

    switch (status) {
      case "registration success":
        message.type = "success";
        message.title = "Dobrodošli";
        message.body = "Uspešno ste se registrovali.";
        break;
      case "new password":
        message.type = "success";
        message.title = "Uspešno ste resetovali Lozinku";
        message.body = `
        Poštovani, na Vašu email adresu je poslata nova lozinka.
        Radi zaštite vaše privatnosti, poželjno je da odmah nakon prijavljivanja promenite lozinku.
        Hvala.`;
        break;
      default:
        break;
    }

    const data = {
      message
    };

    this._alertService.openAlert(data);
  }
}
