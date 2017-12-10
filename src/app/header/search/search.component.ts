import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { SearchService } from '../../services/search.service';
import { ArticlesService } from '../../services/articles.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { UtilsService } from '../../services/utils.service';

import { SearchResultsComponent } from '../../shared/components/search-results/search-results.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.html'
})
export class SearchComponent implements OnDestroy, OnInit {
  private _sendToSearchService = new Subject();
  private _subscription: Subscription[] = [];
  public errorMessage;
  public result: any;
  private _userLikedCategories = [];
  private _userLikedTags = [];
  private _userVisitedCtegories = [];
  private userVisitedTags = [];
  public allArticles;
  private _autoCompleteEntities: any = [];
  public autocompleteResultsList = [];
  public searchPhrase = '';

  constructor(
    private _searchService: SearchService,
    private _articlesService: ArticlesService,
    private _authService: AuthService,
    private _modalService: ModalService,
    private _utilsService: UtilsService,
    private _ngZone: NgZone
  ) {}

  ngOnInit() {
    this.subscribeToAllArticlesWithTextFetchEvent();
    this.subscribeToUserLogInEvent();
    this.subscribeToGetAllArticlesEvent();
    this.subscribeToAutoCompleteEntitiesReadyEvent();
  }

  ngOnDestroy() {
    this._subscription.forEach(subscription => subscription.unsubscribe());
  }

  search1(phrase) {
    this._subscription.push(
      this._sendToSearchService.subscribe(
        result => (this.result = result),
        error => console.log(error)
      )
    );
  }

  subscribeToAllArticlesWithTextFetchEvent() {
    this._subscription.push(
      this._articlesService.allArticlesWithTextStateChange$.subscribe(
        notification =>
          (this.allArticles = this._articlesService.allArticlesWithText)
      )
    );
  }

  subscribeToUserLogInEvent() {
    this._subscription.push(
      this._authService.authStatusChange$.subscribe(notification => {
        this._userLikedTags = this._getUserLikedTags();
        this._userLikedCategories = this._getUserLikedCategories();
        this._userVisitedCtegories = this._getUserVisitedCategories();
        this.userVisitedTags = this._getUserVisitedTags();
      })
    );
  }

  subscribeToGetAllArticlesEvent() {
    this._subscription.push(
      this._articlesService.allArticlesStateChange$.subscribe(() =>
        this._ngZone.runOutsideAngular(() =>
          setTimeout(() => this.getAllArticles(), 3500)
        )
      )
    );
  }

  public subscribeToAutoCompleteEntitiesReadyEvent() {
    this._subscription.push(
      this._articlesService.searchAutoCompleteEntitiesReady$.subscribe(
        entities => {
          this._autoCompleteEntities = entities;
        }
      )
    );
  }

  getAllArticles() {
    this._articlesService.getAllArticlesWithText();
  }

  formatUserInput(event, phrase) {
    event.stopPropagation();
    if (event.keyCode === 13) {
      this.search(phrase);
    }
  }

  search(phrase) {
    this.resetAutoCompleteResults();
    phrase = phrase.trim();
    let results: any = this._searchService
      .filterArticles(phrase, this.allArticles)
      .sort(
        (article1, article2) =>
          this.getPoints(article2) - this.getPoints(article1)
      );
    if (!results || results.length === 0) {
      results = 'Nema rezultata za Vasu pretragu';
    }
    this._modalService.openModal({
      component: SearchResultsComponent,
      data: {
        title: 'Rezultati Pretrage: ',
        results
      }
    });
  }

  public order(article1, article2) {
    const result1 = this.getPoints(article1);
    const result2 = this.getPoints(article2);
    console.log(article1, article2);
    console.log(result1, result2);
    return result1 - result2;
  }

  public getPoints(article) {
    const points = [1, 2, 3, 4, 10];
    let result = 0;
    if (
      this._userLikedCategories.find(
        likedCategory => likedCategory === article.category
      )
    ) {
      result += points[3];
    }
    if (
      this._userVisitedCtegories.find(
        visitedCategory => visitedCategory === article.category
      )
    ) {
      result += points[1];
    }
    if (
      this._userLikedTags.find(likedTag => {
        return article.tags.split('|').find(tag => tag === likedTag);
      })
    ) {
      result += points[2];
    }
    if (
      this.userVisitedTags.find(visitedTag => {
        return article.tags.split('|').find(tag => tag === visitedTag);
      })
    ) {
      result += points[0];
    }
    if (article['foundIn'] === 'title') {
      result += points[4];
    }

    return result;
  }

  private _getUserLikedTags() {
    return this._authService.getUser()['liked_tags'];
  }

  private _getUserLikedCategories() {
    return this._authService.getUser()['liked_categories'];
  }

  private _getUserVisitedCategories() {
    return this._authService.getUser()['visited_categories'];
  }

  private _getUserVisitedTags() {
    return this._authService.getUser()['visited_tags'];
  }

  public resetAutoCompleteResults() {
    this.autocompleteResultsList = [];
    this.searchPhrase = '';
  }

  public autoComplete() {
    if (this.searchPhrase.length < 2) {
      return;
    }

    this.autocompleteResultsList = this._autoCompleteEntities
      .filter(article => {
        return article.titleSearchString.includes(
          this._utilsService.formatStringForSearch(this.searchPhrase)
        );
      })
      .slice(0, 10);
  }

  clearSearchResults() {
    this.autocompleteResultsList = [];
  }
}
