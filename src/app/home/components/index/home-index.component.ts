import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ConfigurationService } from '../../../services/configuration.service';
import { ArticlesService } from '../../../services/articles.service';
import { NotifyService } from '../../../services/notify.service';
import { LoaderService } from '../../../services/loader.service';
import { UtilsService } from '../../../services/utils.service';

import { SpecificCategoriesComponent } from '../specific-categories/specific-categories.component';

@Component({
  selector: 'home-index',
  templateUrl: './home-index.html'
})
export class HomeIndexComponent extends SpecificCategoriesComponent
  implements OnInit, OnDestroy {
  constructor(
    _articlesService: ArticlesService,
    _notifyService: NotifyService,
    _changeDetectorRef: ChangeDetectorRef,
    _loaderService: LoaderService,
    _utilsService: UtilsService,
    _configurationService: ConfigurationService
  ) {
    super(
      _articlesService,
      _notifyService,
      _changeDetectorRef,
      _loaderService,
      _utilsService,
      _configurationService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected _listenToArticlesFetched() {
    if (this._isSubscribedToArticlesFetchEvent) {
      this._organizeArticles();
      return;
    }

    this._subscriptions.push(
      this._articlesService.fetchedIndexPageArticles$.subscribe(articles => {
        console.log(articles);
        this._allArticles = articles;
        this._organizeArticles();
        this._loaderService.hide();
        this._changeDetectorRef.detectChanges();
      })
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
}
