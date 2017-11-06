import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { LoginComponent } from '../../shared/components/login/login.component';
import { RegistrationComponent } from '../../shared/components/registration/registration.component';
import { AuthService } from "../../services/auth.service";
import { ModalService } from "../../services/modal.service"
import { ConfigurationService } from "../../services/configuration.service";

@Component({
  selector: "app-top-navigation",
  templateUrl: "./top-navigation.html"
})
export class TopNavigationComponent implements OnInit {
  public user;
  public showLogIn;
  private _subscriptions: Array<Subscription> = [];

  constructor(
      private _authService: AuthService,
      private _modalService: ModalService,
      private _configurationService: ConfigurationService,
      private _changeDetectorRef: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this._listenForUserStatusChange();
  }

  private _listenForUserStatusChange() {
    this._subscriptions.push(
      this._authService.authStatusChange$.subscribe(() => {
        console.log("USER LOGGEDIN", this._authService.getUser());
        this.user = this._authService.getUser();
        this._changeDetectorRef.detectChanges();
      }),
      this._configurationService.configurationStatusChange$.subscribe(
        notification => {
          this.showLogIn = this._configurationService.getParam('is_login_enabled');
          console.log(this.showLogIn);
          this._changeDetectorRef.detectChanges();
        },
        error => console.log(error)
      )
    );
  }

  public openLoginModal() {
    this._modalService.openModal({
      component: LoginComponent
    });
  }

  public openRegistrationModal(){
    this._modalService.openModal({
      component: RegistrationComponent
    })
  }

  public logout() {
    this._authService.logout();
   }

   public openRegisterModal(){

   }
}
