import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription"

import { ModalService } from "../../../services/modal.service";
import { ValidatorService } from "../../../services/validator.service";
import { AuthService } from "../.../../../../services/auth.service";
import { ResponseService } from '../../../services/response.service';

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.html"
})
export class ResetPaswordComponent implements OnInit, OnDestroy {
  public email;
  public isEmailValid = true;
  public errorMessage = 'Molimo Vas da popunite sva polja';
  public authStatusError;
  public isFormValid = true;

  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _modalService: ModalService,
    private _validtorService: ValidatorService,
    private _authService: AuthService,
    private _responseService: ResponseService
  ) {}

  public ngOnInit() {
    this._listenForAuthActionResponseStatuses();
  }

  public ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _listenForAuthActionResponseStatuses() {
    this._subscriptions.push(
      this._responseService.authActionResponseStatus$.subscribe(status => {
        if (status['type'] === 'login success') {
          this.close();

          return;
        }

        this.errorMessage = status['title'];
        this.authStatusError = status['body'];
        this.isFormValid = false;
      })
    );
  }

  public close() {
    this._modalService.closeModal();
  }

  public validate(param) {
    this.isEmailValid = this._validtorService.isEmailValid(this.email);
  }

  public resetPassword() {
    if (this.email && this.isEmailValid) {
      this._authService.resetPassword(this.email);
    }
  }
}
