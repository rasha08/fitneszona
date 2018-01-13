import {
  Component,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  NgZone
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as diference from 'lodash/difference';

import { ConfigurationService } from '../../../services/configuration.service';
import { AuthService } from '../../../services/auth.service';
import { ArticlesService } from '../../../services/articles.service';
import { ReplacmentListService } from './services/replacment-list.service';

@Component({
  selector: 'left-sidebar-component',
  templateUrl: './left-sidebar.html'
})
export class LeftSidebarComponent implements OnInit, OnDestroy {
  private _subscriptions: Array<Subscription> = [];
  public tags = [];
  public tagsInReplacmentList = [];
  public tagsInSidebar = [];
  public numberOfArticlesByTag = 0;
  private _tagsPriorityList = [];
  private _filteredArticles = [];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _configurationService: ConfigurationService,
    private _authService: AuthService,
    private _articlesService: ArticlesService,
    private _replacmentListService: ReplacmentListService,
    private _ngZone: NgZone
  ) {}

  ngOnInit() {
    this._subscribeToConfigurationFetchEvent();
    this._subscribeToAllArticlesFetchEvent();
    this._subscribeToTagReplacmentEvent();
    this._subscribeToUserLogInEvent();
    this._subscribeToShouldResortSidebar();
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

  private _subscribeToTagReplacmentEvent() {
    this._subscriptions.push(
      this._replacmentListService.replaceTagListNotification$.subscribe(
        replacmentTag => {
          let newTag = replacmentTag[0];
          let newTagIndex = this.tagsInReplacmentList.findIndex(
            tag => tag.name === newTag.name
          );
          let oldTagIndex = replacmentTag[1];
          let oldTag = this.tagsInSidebar[oldTagIndex];
          let newTagName = newTag.name;
          this.switchTagsInLists(
            newTag,
            newTagIndex,
            oldTag,
            oldTagIndex,
            this.tagsInSidebar,
            this.tagsInReplacmentList
          );
          this.setUserFavoriteTags(newTagName, oldTagIndex);

          this._changeDetectorRef.detectChanges();
        }
      )
    );
  }

  private _subscribeToUserLogInEvent() {
    this._subscriptions.push(
      this._authService.authStatusChange$.subscribe(isLoggedIn => {
        if (!isLoggedIn) {
          this._populateSidebar();
          return;
        }

        this.tags = this.tagsInSidebar.concat(this.tagsInReplacmentList);
        let userFavTags = this.getUserFavoriteTags();
        if (userFavTags.length < 6) {
          return;
        }

        this.tagsInSidebar = [];
        this._tagsPriorityList.map(tag => {
          let tagIndex = this.tags.findIndex(tagObj => tagObj.name === tag);
          if (userFavTags.indexOf(tag) === -1) {
            this.tagsInReplacmentList.push(this.tags[tagIndex]);
          } else {
            this.tagsInSidebar.push(this.tags[tagIndex]);
          }
        });

        this._changeDetectorRef.detectChanges();
      })
    );
  }

  private _subscribeToShouldResortSidebar() {
    this._subscriptions.push(
      this._articlesService.sholudResortTags$.subscribe(() => {
        console.log('next');
        this._populateSidebar(true);
        this._changeDetectorRef.detectChanges();
      })
    );
  }

  public switchTagsInLists(
    newTag,
    newTagIndex,
    oldTag,
    oldTagIndex,
    array1,
    array2
  ) {
    array1[oldTagIndex] = newTag;
    array2[newTagIndex] = oldTag;
    this._changeDetectorRef.detectChanges();
  }

  public setUserFavoriteTags(tag, index) {
    if (this.getUser()) {
      let id = this.getUserId();
      let userFavTags = this.getUserFavoriteTags();
      if (userFavTags.length < 6) {
        let tagNames = this.getNamesOfTagsInTagsList(this.tagsInSidebar);
        this.initialiseUserTagsInLeftSidebar(id, tagNames);
      } else {
        this._replacmentListService.replaceUserTagInSidebar(id, tag, index);
      }
    } else {
      console.log('User not loged in');
    }
  }

  private _populateSidebar(shouldRepopulate?) {
    this._filteredArticles = [];
    this.tags = [];
    this._tagsPriorityList.map(tag => {
      this.tags.push({
        name: tag,
        texts: this._articlesService.orderByTimeOfUpdate(
          this._articlesService
            .getArticlesByTagName(tag, 10)
            .filter(article => this._isArticleAlreadyAssigned(article.id))
        )
      });
    });

    const emptyTags = [];
    this.tags.forEach(tag => {
      if (!tag.name) {
        tag.name = 'OSTALI TEKSTOVI';
      }
      if (tag.texts.length === 0) {
        emptyTags.push(tag.name);
      }
    });

    emptyTags.forEach(tagName => {
      const index = this.tags.findIndex(tag => tag.name === tagName);
      if (index !== -1) {
        this.tags.splice(index, 1);
      }
    });

    if (!shouldRepopulate) {
      this.tagsInSidebar = this.tags.splice(0, 6);
      this.tagsInReplacmentList = this.tags.splice(0, this.tags.length);
    } else {
      this.tagsInSidebar = this.tagsInSidebar.map(tag => {
        const foundedTag = this.tags.find(
          singleTag => singleTag.name === tag.name
        );
        if (!foundedTag) {
          return this.tagsInReplacmentList.pop();
        }

        return foundedTag;
      });
      this.tagsInReplacmentList.map(tag => {
        return this.tags.find(singleTag => singleTag.name === tag.name);
      });
    }
  }

  private _isArticleAlreadyAssigned(id) {
    if (this._filteredArticles.indexOf(id) !== -1) {
      return false;
    }
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

  public initialiseUserTagsInLeftSidebar(id, tags) {
    console.log('Tags in sidebar is cnaging');
    this._replacmentListService.initialiseUserTagsInLeftSidebar(id, tags);
  }

  getUserFavoriteTags() {
    return this._authService.getUser().favorite_tags || false;
  }

  getUserId() {
    return this._authService.getUser().id;
  }

  getUser() {
    return this._authService.getUser();
  }

  getNamesOfTagsInTagsList(tagList) {
    let names = [];
    for (let tag of tagList) {
      names.push(tag.name);
    }
    return names;
  }
}
