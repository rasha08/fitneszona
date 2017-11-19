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

import { ModalService } from './services/modal.service';
import { LocalStorageService } from './services/local-storage.service';
import { ArticlesService } from './services/articles.service';
import { ConfigurationService } from './services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('placeholder', { read: ViewContainerRef })
  placeholder;

  private _componentRef;
  public article: any;
  private _subscription: Subscription;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _modalService: ModalService,
    private _localStorageService: LocalStorageService,
    private _articlesService: ArticlesService,
    private _configurationService: ConfigurationService
  ) {
    this._configurationService.getConfiguration();
  }

  public ngOnInit() {
    this._listenForModalOpenCloseEvents();
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
}
