import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { AlertService } from "./alert.service";

@Injectable()
export class ResponseService {
  private _shouldEmitStatus = false;
  private _authActionResponseStatus= new Subject();

  public authActionResponseStatus$ = this._authActionResponseStatus.asObservable();

  constructor(private _alertService: AlertService) {}

  public handleResponse(responseObject) {
    const status = responseObject.status;
    let message;
    console.log('STATUS', status);
    switch (status) {
      case "registration success":
        message = this._constructResponseMessage(
          'succes',
          'Dobrodošli',
          'Uspešno ste se registrovali.'
        );
        break;
      case "new password":
        message = this._constructResponseMessage(
          'succes',
          'Uspešno ste resetovali Lozinku',
          'Poštovani, na Vašu email adresu je poslata nova lozinka. Radi zaštite vaše privatnosti, poželjno je da odmah nakon prijavljivanja promenite lozinku. Hvala.'
        );
        break;
      case "non existing user":
        message = this._constructResponseMessage(
          'error',
          'Nepostojeći korisnik',
          'Žao nam je, ali u na sajtu ne postoji korisnik sa datim kredencijalima.'
        );

        this._shouldEmitStatus = true;
        break;
      case "wrong password": 
        message = this._constructResponseMessage(
          'error',
          'Pogrešna Lozinka',
          'Žao nam je, uneli ste pogrešnu lozinku.'
        );

        this._shouldEmitStatus = true;
        break;
      case "login success": 
        message = this._constructResponseMessage(
          'login success',
          '',
          ''
        );

        this._shouldEmitStatus = true;
        break;
      default:
        break;
    }

    if (this._shouldEmitStatus) {
      this._emitAuthActionResponseStatus(message);

      this._shouldEmitStatus = false;
      return;
    }

    const data = {
      message
    };

    this._alertService.openAlert(data);
  }

  private _constructResponseMessage(type, title, body) {
    return {
      type,
      title,
      body
    };
  }

  private _emitAuthActionResponseStatus(status) {
    this._authActionResponseStatus.next(status);
  }
}
