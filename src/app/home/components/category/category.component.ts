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
import { LoaderService } from '../../../services/loader.service'
import {  UtilsService }  from "../../../services/utils.service"
import { ConfigurationService } from "../../../services/configuration.service";

declare const $;

@Component({
  selector: 'category',
  templateUrl: './category.html'
})
export class CategoryComponent implements AfterViewInit, OnInit, OnDestroy {
  public mainArticle;
  public secondaryArticles;
  public articles;
  public articlesCategory;
  private _subscriptions: Array<Subscription> = [];
  constructor(
    private _articlesService: ArticlesService,
    private _notifyService: NotifyService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _loaderService: LoaderService,
    private _utilsService: UtilsService,
    private _configurationService: ConfigurationService
  ) {}
  ngAfterViewInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  }

  ngOnInit() {
    this._listenToArticlesFetched();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  private _listenToArticlesFetched() {
    this._subscriptions.push(
      this._articlesService.fetchedCategoryArticles$.subscribe(articles => {
        this.mainArticle = articles;
        this._articlesService.orderByTimeOfUpdate(this.mainArticle);
        this.secondaryArticles = this.mainArticle.splice(1);
        this.mainArticle = this.mainArticle[0];
        this.articlesCategory = this._configurationService.getParam('active_categories').find(
          categoryObj => categoryObj.category == this.mainArticle.category
        );
        this.articles = this.secondaryArticles.splice(3);
        this._changeDetectorRef.detectChanges();
        this._loaderService.hide();
      })
    );
  }

  getArticleUrl(category, article){
    return this._utilsService.getArticleUrl(category, article);
  }
}
