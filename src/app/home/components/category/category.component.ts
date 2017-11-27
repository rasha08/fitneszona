import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ArticlesService } from '../../../services/articles.service';
import { NotifyService } from '../../../services/notify.service';
import { LoaderService } from '../../../services/loader.service';
import { UtilsService } from '../../../services/utils.service';
import { ConfigurationService } from '../../../services/configuration.service';

import { SpecificCategoriesComponent } from '../specific-categories/specific-categories.component';

declare const $;

@Component({
  selector: 'category',
  templateUrl: './category.html'
})
export class CategoryComponent extends SpecificCategoriesComponent
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
      this._articlesService.fetchedCategoryArticles$.subscribe(articles => {
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

    this.articles['main'] = this.articles[0];
    this.articles['featured'] = this.articles.slice(1, 4);
    this.articles['articles'] = this.articles.splice(4);
  }
}
