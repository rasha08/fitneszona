import { Component } from "@angular/core";

import { ModalService } from "../../../services/modal.service";
import { ValidatorService } from "../../../services/validator.service";
import { AuthService } from "../.../../../../services/auth.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.html"
})
export class ResetPaswordComponent {
  public email;
  public isEmailValid = true;

  constructor(
    private _modalService: ModalService,
    private _validtorService: ValidatorService,
    private _authService: AuthService
  ) {}

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
