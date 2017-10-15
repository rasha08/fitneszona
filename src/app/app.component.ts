import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "./services/auth.service";
import { ModalService } from "./services/modal.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild("placeholder", { read: ViewContainerRef })
  placeholder;
  private _componentRef;

  constructor(
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _modalService: ModalService
  ) {
    this._authService.checkIfUserIsLoggedIn();
  }

  public ngOnInit() {
    this._listenForModalOpenCloseEvents();
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
    let {
      component,
      data,
      hideOtherModals,
      successCallback,
      errorCallback
    } = modalData;

    if (hideOtherModals && this._componentRef) {
      this._closeModal();
    }

    let factory = this._componentFactoryResolver.resolveComponentFactory(
      component
    );
    let componentRef = this.placeholder.createComponent(factory);
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
