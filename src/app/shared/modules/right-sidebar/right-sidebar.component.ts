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
  ) { }

  ngOnInit() {
    this._subscibeToAllArticlesFetchEvent();
    this._subscibeToShouldRepoplulateSidebar();
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
      console.log('Calling repopulate sidebar from shouldreplace');
      this.populateRightSidebar();
      this._changeDetectorRef.detectChanges();
    });
  }

  public toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public activateTab(tab) {
    this.activeTab = tab;
    this.isRecomendedTabActive = tab === 'recomended' ? true : false;
  }

  public populateRightSidebar() {
   this.articles = this._articleService.getArticlesForRightSidebar();
  }

}
