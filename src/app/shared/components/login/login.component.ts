import { Component } from "@angular/core";
import { NgForm, FormGroup } from "@angular/forms";

import { ModalService } from "../../../services/modal.service";
import { ValidtorService } from "../../../services/validator.service";
import { AuthService } from "../.../../../../services/auth.service";

import { ResetPaswordComponent } from "../reset-password/reset-password";

@Component({
  selector: "app-login",
  templateUrl: "./login.html"
})
export class LoginComponent {
  public email;
  public password;
  public isEmailValid = true;
  public isPasswordValid = true;
  public isFormValid = true;
  public showForgotPassword = false;
  public RememberMe = false;

  constructor(
    private _modalService: ModalService,
    private _validtorService: ValidtorService,
    private _authService: AuthService
  ) {}

  public close() {
    this._modalService.closeModal();
  }

  public validate(param) {
    if (param === "email") {
      this.isEmailValid = this._validtorService.isEmailValid(this.email);
    } else {
      this.isPasswordValid = this._validtorService.isPasswordValid(
        this.password
      );
    }
  }

  public login() {
    if (!this._isSubmitValid()) {
      this.isFormValid = false;
      this.showForgotPassword = true;
      return;
    }

    this.isFormValid = true;
    let data = {
      email: this.email,
      password: this.password
    };

    this._authService.login(data, this.RememberMe);
  }

  private _isSubmitValid() {
    return (
      this.isEmailValid && this.isPasswordValid && this.email && this.password
    );
  }

  public openForgotPassword() {
    this.close();
    this._modalService.openModal({
      component: ResetPaswordComponent
    });
  }

  public checkToggle() {
    this.RememberMe = !this.RememberMe;
  }
}
