import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "./services/auth.service";
import { ModalService } from "./services/modal.service";
import { LocalStorageService } from "./services/local-storage.service";
import { ArticlesService } from "./services/articles.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild("placeholder", { read: ViewContainerRef })
  placeholder;
  private _componentRef;
  public article: any;
  private _subscription: Subscription;

  constructor(
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _modalService: ModalService,
    private _localStorageService: LocalStorageService,
    private _articlesService: ArticlesService
  ) {
    this._authService.checkIfUserIsLoggedIn();
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

    console.log('called create modal');
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

    console.log(this.placeholder);
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

  private testServices(){
    this._subscription = this._articlesService.openArticle$.subscribe(
      article => console.log(article),
      error => console.log(error)
    )
  }

  private testRestApi(){
    this.testServices();
    this._articlesService.getAllArticle();
    this._articlesService.getArticle(28);
    this._articlesService.getArticleCategoryAndTags(14);
    this._articlesService.getArticlesForCategory('trening');
    this._articlesService.getLatestArticles();
    this._articlesService.getLatestArticlesForCategory('power'); //test za Rasu
    this._articlesService.getTopArticles();
    this._articlesService.getTopArticlesForCategory('power');
  }
}
