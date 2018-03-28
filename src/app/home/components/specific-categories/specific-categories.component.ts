import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';

import { ConfigurationService } from '../../../services/configuration.service';
import { ArticlesService } from '../../../services/articles.service';
import { NotifyService } from '../../../services/notify.service';
import { LoaderService } from '../../../services/loader.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'specific-categories',
  templateUrl: './specific-categories.html'
})
export class SpecificCategoriesComponent implements OnDestroy, OnInit {
  public articles = [];
  protected _allArticles;
  protected _activeCategories = [];
  protected _isSubscribedToArticlesFetchEvent = false;
  protected _selectedArticle;
  protected _subscriptions: Array<Subscription> = [];

  constructor(
    protected _articlesService: ArticlesService,
    protected _notifyService: NotifyService,
    protected _changeDetectorRef: ChangeDetectorRef,
    protected _loaderService: LoaderService,
    protected _utilsService: UtilsService,
    protected _configurationService: ConfigurationService,
    protected _router: Router,
    protected _ngZone: NgZone
  ) {}

  ngOnInit() {
    if (this._articlesService.allArticlesFetched) {
      this.setArticlesForPage();
    } else {
      this.subscribeToAllArticlesFetchedEvent();
    }

    this._subscribeToRouteChange();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected _subscribeToRouteChange() {
    this._subscriptions.push(
      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.setArticlesForPage();
        }
      })
    );
  }

  protected subscribeToAllArticlesFetchedEvent() {
    this._subscriptions.push(
      this._articlesService.allArticlesStateChange$.subscribe(() => {
        this._ngZone.run(() => {
          this.setArticlesForPage();
        });
      })
    );

    this._isSubscribedToArticlesFetchEvent = true;
  }

  protected setArticlesForPage() {
    this._allArticles = this._articlesService.getArticlesForPage();
    this._changeDetectorRef.detectChanges();
    this._organizeArticles();
    this._changeDetectorRef.detectChanges();
    this._loaderService.hide();
    this._changeDetectorRef.detectChanges();
  }

  protected _organizeArticles() {
    this._activeCategories = this._configurationService.getParam(
      'active_categories'
    );
    this.articles = this._allArticles.filter(
      article =>
        this._activeCategories.findIndex(
          activeCategory => activeCategory.category === article.category
        ) !== -1
    );

    this.articles['featured'] = this.articles.slice(0, 3);
    this.articles['articles'] = this.articles.splice(3);
  }

  public getArticleUrl(article) {
    const category = this._getArticleCatgeoryObject(article);
    return this._utilsService.getArticleUrl(category, article);
  }

  private _getArticleCatgeoryObject(article) {
    return this._activeCategories.find(
      activeCategory => activeCategory.category === article.category
    );
  }

  public selectArticle(id) {
    if (this.isArticleSelected(id)) {
      this._selectedArticle = null;
    } else {
      this._selectedArticle = id;
    }

    this._changeDetectorRef.detectChanges();
  }

  public isArticleSelected(id) {
    return this._selectedArticle === id;
  }
}
