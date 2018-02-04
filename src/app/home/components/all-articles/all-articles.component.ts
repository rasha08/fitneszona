import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { ArticlesService } from '../../../services/articles.service';
import { NotifyService } from '../../../services/notify.service';
import { LoaderService } from '../../../services/loader.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { UtilsService } from '../../../services/utils.service';
import { SeoRulesService } from '../../../services/seo-rules.service';

declare const $;

@Component({
  selector: 'all-articles',
  templateUrl: './all-articles.html'
})
export class AllArticlesComponent implements OnInit {
  public articles = [];
  public activeCategories = [];
  private activeCategoriesWithoutArticles = [];
  private _selectedArticle;
  private _selectedCategory;

  constructor(
    private _articlesService: ArticlesService,
    private _notifyService: NotifyService,
    private _loaderService: LoaderService,
    private _configurationService: ConfigurationService,
    private _utilsService: UtilsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _seoRulesService: SeoRulesService
  ) {}
  ngOnInit() {
    if (this._articlesService.allArticles) {
      this.groupArticlesByCategory();
      this._seoRulesService.setSeoTagsForPage(
        'all',
        this.articles.slice(0, 50)
      );
    }

    this._subscribeToAllArticlesFetchedEvent();
    $('.collapsible').collapsible();
  }

  private _subscribeToAllArticlesFetchedEvent() {
    this._articlesService.allArticlesStateChange$.subscribe(() => {
      this.groupArticlesByCategory();
      this._seoRulesService.setSeoTagsForPage(
        'all',
        this.articles.slice(0, 50)
      );
    });
  }

  private groupArticlesByCategory() {
    this.articles = this._articlesService.allArticles;
    let activeCategories = this._configurationService.getParam(
      'active_categories'
    );

    this.activeCategoriesWithoutArticles = activeCategories.slice(3);
    this.activeCategoriesWithoutArticles.forEach(category => {
      category['articles'] = this._articlesService.orderByTimeOfUpdate(
        this.articles.filter(article => article.category === category.category)
      );
    });

    Object.assign(this.activeCategories, this.activeCategoriesWithoutArticles);
    this._changeDetectorRef.detectChanges();
  }

  public getArticleUrl(category, article) {
    return this._utilsService.getArticleUrl(category, article);
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

  public selectCategory(name) {
    if (this.isCategorySelected(name)) {
      this._selectedArticle = null;
    } else {
      this._selectedArticle = name;
    }

    this._changeDetectorRef.detectChanges();
  }

  public isCategorySelected(name) {
    return this._selectedArticle === name;
  }
}
