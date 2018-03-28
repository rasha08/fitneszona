import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from '../../../services/modal.service';
import { ValidatorService } from '../../../services/validator.service';
import { AuthService } from '../.../../../../services/auth.service';
import { ResponseService } from '../../../services/response.service';

import { ResetPaswordComponent } from '../reset-password/reset-password';

@Component({
  selector: 'app-login',
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  public email;
  public password;
  public isEmailValid = true;
  public isPasswordValid = true;
  public isFormValid = true;
  public showForgotPassword = false;
  public RememberMe = false;
  public errorMessage = 'Molimo Vas da popunite sva polja';
  public authStatusError;

  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _modalService: ModalService,
    private _validtorService: ValidatorService,
    private _authService: AuthService,
    private _responseService: ResponseService
  ) {}

  ngOnInit() {
    this._listenForAuthActionResponseStatuses();
  }

  ngOnDestroy() {
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
    if (param === 'email') {
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
    return this.isPasswordValid && this.email && this.password;
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
