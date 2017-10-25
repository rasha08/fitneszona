import { Component,OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { UserRegistrationService } from "../../../services/user-registration.service";
import { ValidatorService } from '../../../services/validator.service'
import { ModalService } from "../../../services/modal.service";

import { ResponseStatusInterface } from "../../../models/registration-response";
@Component({
  selector: "app-registration",
  templateUrl: "./registration.html"
})
export class RegistrationComponent {
  private _subscription: Subscription;
  private _userObj= {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  public isFirstnameValid:boolean = false;
  public isLastnameValid: boolean = false;
  public isEmailValid: boolean = false;
  public isPasswordValid: boolean = false; 
  public message;
  public successMessage;
  public errorMessage;
  public apiServiceRespone: Subscription;
  public rememberUser: boolean;

  constructor(
    private _userRegistrationService: UserRegistrationService,
    private _validatorService: ValidatorService,
    private _modalService: ModalService
  ) {}

  ngOnInit(){
    this._subscription = this._userRegistrationService.response$.subscribe(
      response => {
        this.message = response
      },
      error => this.errorMessage = error
    )
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }

  public registerUser(){
    console.log('called register user');
    if (this.checkIfUserInputIsValid()) {
      this._userRegistrationService.registerUser(this._userObj);
    }
    else this.errorMessage = 'Your input is invalid'
  }

  public validate(param: string){
    switch (param){
      case 'firstname':
        this.isFirstnameValid = this._validatorService.isNameOrLastNameValid(this._userObj.firstName);
        break;
      case 'lastname':
        this.isLastnameValid = this._validatorService.isNameOrLastNameValid(this._userObj.lastName);
        break;
      case 'email':
        this.isEmailValid = this._validatorService.isEmailValid(this._userObj.email);
        break;
      case 'password':
        this.isPasswordValid = this._validatorService.isPasswordValid(this._userObj.password);
        break;
      default: 
        null;
    }
  }

  checkIfUserInputIsValid(){
    let firstname, lastname, email, password;
    firstname = this._validatorService.isNameOrLastNameValid(this._userObj.firstName);
    lastname = this._validatorService.isNameOrLastNameValid(this._userObj.lastName);
    email = this._validatorService.isEmailValid(this._userObj.email);
    password = this._validatorService.isPasswordValid(this._userObj.password);

    return Boolean(firstname && lastname && email && password);
  }

  public closeModal(){
    this._modalService.closeModal();
  }
}
