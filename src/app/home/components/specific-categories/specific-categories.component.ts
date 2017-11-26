import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ConfigurationService } from '../../../services/configuration.service';
import { ArticlesService } from '../../../services/articles.service';
import { NotifyService } from '../../../services/notify.service';
import { LoaderService } from '../../../services/loader.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'specific-categories',
  templateUrl: './specific-categories.html'
})
export class SpecificCategoriesComponent {
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
    protected _configurationService: ConfigurationService
  ) {}

  ngOnInit() {
    if (this._configurationService.isConfigurationFetched) {
      this._listenToArticlesFetched();
    }
    this._listenForConfigurationChangeEvent();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _listenForConfigurationChangeEvent() {
    this._subscriptions.push(
      this._configurationService.configurationStatusChange$.subscribe(() => {
        this._listenToArticlesFetched();
      })
    );
  }

  protected _listenToArticlesFetched() {
    if (this._isSubscribedToArticlesFetchEvent) {
      this._organizeArticles();
      return;
    }

    this._subscriptions.push(
      this._articlesService.specificCategoryArticlesFetched$.subscribe(
        articles => {
          this._allArticles = articles;
          this._organizeArticles();
          this._loaderService.hide();
          this._changeDetectorRef.detectChanges();
        }
      )
    );

    this._isSubscribedToArticlesFetchEvent = true;
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
