import { Component, ChangeDetectorRef } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.html'
})
export class RightSidebarComponent {
  public isSidebarOpen = false;
  public isRecomendedTabActive = true;
  public activeTab = 'recomended';
  public historyArticles = [];

  constructor(
    private _articleService: ArticlesService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this._subscibeToallArticlesFetchEvent();
    this._subscibeToShouldRepoplulateSidebar();
  }

  private _subscibeToallArticlesFetchEvent() {
    this._articleService.allArticlesStateChange$.subscribe(() => {
      this.historyArticles = this._articleService.getArticlesMarketsForHistory();
      this._changeDetectorRef.detectChanges();
    });
  }

  private _subscibeToShouldRepoplulateSidebar() {
    this._articleService.sholudResortTags$.subscribe(() => {
      this.historyArticles = this._articleService.getArticlesMarketsForHistory();
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
}
