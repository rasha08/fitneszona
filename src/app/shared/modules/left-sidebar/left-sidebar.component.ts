import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ConfigurationService } from '../../../services/configuration.service';
import { AuthService } from '../../../services/auth.service';
import { ArticlesService } from '../../../services/articles.service';

@Component({
  selector: 'left-sidebar-component',
  templateUrl: './left-sidebar.html'
})
export class LeftSidebarComponent implements OnInit, OnDestroy {
<<<<<<< HEAD
=======

>>>>>>> Irrelevant changes
  private _subscriptions: Array<Subscription> = [];
  public tags = [];
  public unusedTags = [];
  public tagsInSidebar;
  public numberOfArticlesByTag = 0;
  private _tagsPriorityList = [];
  private _filteredArticles = [];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _configurationService: ConfigurationService,
    private _authService: AuthService,
    private _articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this._subscribeToConfigurationFetchEvent();
    this._subscribeToAllArticlesFetchEvent();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getAllArticles() {
    this._articlesService.getAllArticles();
  }

  private _subscribeToConfigurationFetchEvent() {
    this._subscriptions.push(
      this._configurationService.configurationStatusChange$.subscribe(() => {
        this._getConfigurationParametars();
      })
    );
  }

  private _subscribeToAllArticlesFetchEvent() {
    this._subscriptions.push(
      this._articlesService.allArticlesStateChange$.subscribe(() => {
        this._populateSidebar();
        this._changeDetectorRef.detectChanges();
      })
    );
  }

  private _populateSidebar() {
    this._tagsPriorityList.map(tag => {
<<<<<<< HEAD
      this.tags.push({
        name: tag,
        texts: this._articlesService.orderByTimeOfUpdate(
          this._articlesService
            .getArticlesByTagName(tag, 15)
            .filter(article => this._isArticleAlreadyAssigned(article.id))
        )
      });
=======
      this.tags.push(
        {
          name: tag,
          texts: this._articlesService.orderByTimeOfUpdate(
            this._articlesService.getArticlesByTagName(tag, 15)
              .filter(article => this._isArticleAlreadyAssigned(article.id))
          )
        }

      );
<<<<<<< HEAD
>>>>>>> Added cosmetic changes to left-sidebar.component
=======
      this.unusedTags.push(tag);
>>>>>>> Irrelevant changes
    });

    this.tagsInSidebar = this.tags.splice(0, 6);
    this.unusedTags = this.unusedTags.slice(6);
  }

  private _isArticleAlreadyAssigned(id) {
    if (this._filteredArticles.indexOf(id) !== -1) {
<<<<<<< HEAD
      return false;
    }
=======
       return false;
      }
>>>>>>> Added cosmetic changes to left-sidebar.component
    this._filteredArticles.push(id);

    return true;
  }

  private _getConfigurationParametars() {
    this.numberOfArticlesByTag = this._configurationService.getParam(
      'number_of_articles_in_sidebar'
    );
    this._tagsPriorityList = this._configurationService.getParam(
      'tags_priority_list'
    );
  }

  replaceUserTag(event){
    
  }
}
