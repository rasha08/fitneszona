import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserRegistrationService } from '../../../services/user-registration.service';
import { ValidatorService } from '../../../services/validator.service';
import { ModalService } from '../../../services/modal.service';
import { ResponseService } from '../../../services/response.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html'
})
export class RegistrationComponent {
  private _subscription: Subscription;
  public _userObj = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  public isFirstnameValid: boolean = true;
  public isLastnameValid: boolean = true;
  public isEmailValid: boolean = true;
  public isPasswordValid: boolean = true;
  public message;
  public successMessage;
  public errorMessage;
  public rememberUser: boolean;
  public isFormValid = true;
  public authStatusError;

  constructor(
    private _userRegistrationService: UserRegistrationService,
    private _validatorService: ValidatorService,
    private _modalService: ModalService,
    private _responseService: ResponseService
  ) {}

  ngOnInit() {
    this._subscription = this._responseService.authActionResponseStatus$.subscribe(
      status => {
        if (status['type'] === 'login success') {
          this.closeModal();

          return;
        }

        this.errorMessage = status['title'];
        this.authStatusError = status['body'];
        this.isFormValid = false;
      }
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  public registerUser() {
    if (this.checkIfUserInputIsValid()) {
      this._userRegistrationService.registerUser(this._userObj);
    } else {
      this.errorMessage = 'Your input is invalid';
    }
  }

  public validate(param: string) {
    switch (param) {
      case 'firstname':
        this.isFirstnameValid = this._validatorService.isNameOrLastNameValid(
          this._userObj.firstName
        );
        break;
      case 'lastname':
        this.isLastnameValid = this._validatorService.isNameOrLastNameValid(
          this._userObj.lastName
        );
        break;
      case 'email':
        this.isEmailValid = this._validatorService.isEmailValid(
          this._userObj.email
        );
        break;
      case 'password':
        this.isPasswordValid = this._validatorService.isPasswordValid(
          this._userObj.password
        );
        break;
      default:
        break;
    }
  }

  checkIfUserInputIsValid() {
    return (
      this.isFirstnameValid && this.isLastnameValid && this.isPasswordValid
    );
  }

  public closeModal() {
    this._modalService.closeModal();
  }
}
