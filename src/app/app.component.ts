import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ModalService } from './services/modal.service';
import { LocalStorageService } from './services/local-storage.service';
import { ArticlesService } from './services/articles.service';
import { ConfigurationService } from './services/configuration.service';
import { BottomMenuService } from './shared/modules/bottom-menu/services/bottom-menu.service';
import { UserConfigurationService } from './services/user-configuration.service';
import { AppAnimationService } from './services/app.animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('placeholder', { read: ViewContainerRef })
  placeholder;

  private _componentRef;
  public theme = 'dark';
  private _subscription: Subscription;
  public isMobile = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _modalService: ModalService,
    private _localStorageService: LocalStorageService,
    private _articlesService: ArticlesService,
    private _configurationService: ConfigurationService,
    private _bottomMenuService: BottomMenuService,
    private _router: Router,
    private _userConfigurationService: UserConfigurationService,
    private _appAnimationService: AppAnimationService
  ) {
    this._configurationService.getConfiguration();
  }

  public ngOnInit() {
    this._listenForModalOpenCloseEvents();
    this._listenForConfigurationChange();
    this._listenForRouteChange();
    this._listenForUserconfigurationChange();
    this._subscribeToWindowResizeEvent();
    this.checkResolution();
  }

  public ngOnDestroy() {
    this._localStorageService.setLastVisitFromBrowser();
  }

  private _listenForModalOpenCloseEvents() {
    this._modalService.openModal$.subscribe(data => {
      this._createModal(data);
      this._changeDetectorRef.detectChanges();
    });

    this._modalService.closeModal$.subscribe(() => {
      this._closeModal();
      this._changeDetectorRef.detectChanges();
    });
  }

  private _listenForConfigurationChange() {
    this._configurationService.configurationStatusChange$.subscribe(() => {
      this.theme = this._configurationService.getParam('theme');
    });
  }

  private _listenForRouteChange() {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._appAnimationService.closeMenuBars();
        window.scrollTo(0, 0);
      }
    });
  }

  private _listenForUserconfigurationChange() {
    this._userConfigurationService.userConfigurationChange$.subscribe(
      status => {
        if (status && this._userConfigurationService.getUserTheme()) {
          this.theme = this._userConfigurationService.getUserTheme();
        } else {
          this.theme = this._configurationService.getParam('theme');
        }
      }
    );
  }

  private _subscribeToWindowResizeEvent() {
    Observable.fromEvent(window, 'resize').subscribe(e => {
      this.checkResolution();
    });
  }

  private _createModal(modalData) {
    const {
      component,
      data,
      hideOtherModals,
      successCallback,
      errorCallback
    } = modalData;

    if (hideOtherModals && this._componentRef) {
      this._closeModal();
    }

    const factory = this._componentFactoryResolver.resolveComponentFactory(
      component
    );

    const componentRef = this.placeholder.createComponent(factory);
    this._componentRef = componentRef;
    componentRef.instance.modal = componentRef;

    if (data) {
      componentRef.instance.data = data;
    }

    if (errorCallback) {
      componentRef.instance.errorCallback = errorCallback;
    }

    if (successCallback) {
      componentRef.instance.successCallback = successCallback;
    }
  }

  private _closeModal() {
    this._componentRef.destroy();
  }

  public toggleBotomMenu() {
    this._bottomMenuService.toggleBottomMenuStatus();
  }

  public toggleCustomerSuport() {
    this._bottomMenuService.toggleCustomerSupportStatus();
  }

  public checkResolution() {
    console.log('CHECK');
    if (window && window.innerWidth < 1000) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public toggleRightSidebar() {
    this._appAnimationService.toggleRightSideBar();
  }
  public toggleLeftSidebar() {
    this._appAnimationService.toggleLeftSideBar();
  }
}
