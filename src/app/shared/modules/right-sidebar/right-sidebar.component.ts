import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ArticlesService } from '../../../services/articles.service';
import { VisitedArticlesService } from '../../../services/visited-articles.service';



@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.html'
})
export class RightSidebarComponent implements OnInit, OnDestroy{
  public isSidebarOpen = false;
  public isRecomendedTabActive = true;
  public activeTab = 'recomended';
  public historyArticles = [];
  private _subscription: Subscription[] = [];
  public articles = [];

  constructor(
    private _articleService: ArticlesService,
    private _visitedArticlesService: VisitedArticlesService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this._subscibeToShouldRepoplulateSidebar();
  }

  ngOnInit() {
    this._subscibeToAllArticlesFetchEvent();
  }

  ngOnDestroy() {
    this._subscription.forEach( subscription => subscription.unsubscribe());
  }

  private _subscibeToAllArticlesFetchEvent() {
    this._articleService.allArticlesStateChange$.subscribe(() => {
      this.historyArticles = this._articleService.getArticlesMarketsForHistory();
      this.populateRightSidebar();
      this._changeDetectorRef.detectChanges();
    });
  }

  private _subscibeToShouldRepoplulateSidebar() {
    this._articleService.sholudResortTags$.subscribe(() => {
      this.historyArticles = this._articleService.getArticlesMarketsForHistory();
      this.populateRightSidebar();
      this._changeDetectorRef.detectChanges();
    });
  }

  private _subscribeToAllArticlesFrtchEvent() {
    this._subscription.push(
      this._articleService.allArticlesStateChange$.subscribe(
      _ => this.populateRightSidebar()
      )
    );
  }

  public toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public activateTab(tab) {
    this.activeTab = tab;
    this.isRecomendedTabActive = tab === 'recomended' ? true : false;
  }

  public populateRightSidebar() {
    const topArticles = this._articleService.topArticles;
    const indexArticles = this._articleService.indexArticles;
    const latestArticles = this._articleService.latestArticles;
    const articlesVisited = this._visitedArticlesService.getArticles();
    for (const article of this._articleService.allArticles) {
      if (this.articles.length < 20) {
        if (
          !(topArticles.indexOf(article.id) !== -1) &&
          !(indexArticles.indexOf(article.id)  !== -1) &&
          !(latestArticles.indexOf(article.id) !== -1) &&
          !(articlesVisited.indexOf(article.id) !== -1)
        ) {
          this.articles.push(article);
        }
      } else {
        break;
      }
    }

    console.log(this.articles);
  }

}
