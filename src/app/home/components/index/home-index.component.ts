import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import { ConfigurationService } from '../../../services/configuration.service';
import { ArticlesService } from '../../../services/articles.service';
import { NotifyService } from '../../../services/notify.service';
import { LoaderService } from '../../../services/loader.service';
import { UtilsService } from '../../../services/utils.service';

import { SpecificCategoriesComponent } from '../specific-categories/specific-categories.component';

declare const window: any;

@Component({
  selector: 'home-index',
  templateUrl: './home-index.html'
})
export class HomeIndexComponent extends SpecificCategoriesComponent
  implements OnInit, OnDestroy {
  private _nuberOfVisibleArticles = 8;

  constructor(
    _articlesService: ArticlesService,
    _notifyService: NotifyService,
    _changeDetectorRef: ChangeDetectorRef,
    _loaderService: LoaderService,
    _utilsService: UtilsService,
    _configurationService: ConfigurationService,
    _router: Router
  ) {
    super(
      _articlesService,
      _notifyService,
      _changeDetectorRef,
      _loaderService,
      _utilsService,
      _configurationService,
      _router
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this._listenForScrollEvent();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  private _listenForScrollEvent() {
    this._subscriptions.push(
      Observable.fromEvent(window, 'scroll').subscribe(e => {
        this._loadMoreIfNeeded();
      })
    );
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

    this.articles['featured'] = this.articles.slice(0, 2);
    this._showRestOfArticles();
  }

  private _showRestOfArticles() {
    this.articles['articles'] = this.articles.slice(
      2,
      this._nuberOfVisibleArticles
    );
  }

  private _loadMoreIfNeeded() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this._nuberOfVisibleArticles < 20) {
        this._nuberOfVisibleArticles += 3;
        this._showRestOfArticles();
        this._changeDetectorRef.detectChanges();
      }
    }
  }
}
