import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoginComponent } from '../../shared/components/login/login.component';
import { RegistrationComponent } from '../../shared/components/registration/registration.component';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { ConfigurationService } from '../../services/configuration.service';
import { AppAnimationService } from '../../services/app.animation.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.html'
})
export class TopNavigationComponent implements OnInit {
  public user;
  public showLogIn;
  private _subscriptions: Array<Subscription> = [];
  public isOpen = false;

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService,
    private _configurationService: ConfigurationService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _appAnimationService: AppAnimationService
  ) {}

  ngOnInit() {
    this._listenForUserStatusChange();
    this._subscribeToCloseMenusEvent();
  }

  private _listenForUserStatusChange() {
    this._subscriptions.push(
      this._authService.authStatusChange$.subscribe(notification => {
        if (notification === true) {
          this.user = this._authService.getUser();
          this._changeDetectorRef.detectChanges();
        } else {
          this.user = null;
        }
      }),
      this._configurationService.configurationStatusChange$.subscribe(
        notification => {
          this.showLogIn = this._configurationService.getParam(
            'is_login_enabled'
          );
          this._changeDetectorRef.detectChanges();
        },
        error => {}
      )
    );
  }

  private _subscribeToCloseMenusEvent() {
    this._appAnimationService.closeMenus$.subscribe(() => {
      this.isOpen = false;
    });
  }

  public openLoginModal() {
    this._appAnimationService.closeMenuBars();
    this._modalService.openModal({
      component: LoginComponent
    });
  }

  public openRegistrationModal() {
    this._appAnimationService.closeMenuBars();
    this._modalService.openModal({
      component: RegistrationComponent
    });
  }

  public logout() {
    this._authService.logout();
    this.toggleAccountMenu();
  }

  public toggleAccountMenu() {
    this.isOpen = !this.isOpen;
  }
}
