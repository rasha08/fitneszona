import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { SearchService } from '../../services/search.service';
import { ArticlesService } from '../../services/articles.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';

import { SearchResultsComponent } from '../../shared/components/search-results/search-results.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.html'
})
export class SearchComponent {
  private _sendToSearchService = new Subject();
  public sendToSearchService$ = this._sendToSearchService.asObservable();
  private _subscription: Subscription[] = [];
  public searchResult;
  public errorMessage;
  public result;
  private _userLikedCategories = [];
  private _userLikedTags = [];
  private _userVisitedCtegories = [];
  private userVisitedTags = [];
  public allArticles;

  constructor(
    private _searchService: SearchService,
    private _articlesService: ArticlesService,
    private _authService: AuthService,
    private _modalService: ModalService
  ) {}

  ngOnInit() {
    this.subscribeToAllArticlesFetchEvent();
    this.subscribeToUserLogInEvent();
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

  subscribeToAllArticlesFetchEvent() {
    this._subscription.push(
      this._articlesService.allArticlesStateChange$.subscribe(
        notification => (this.allArticles = this._articlesService.allArticles)
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

  search(event, phrase) {
    event.stopPropagation();
    if (event.keyCode === 13) {
      const results = this._searchService
        .filterArticles(phrase, this.allArticles)
        .sort(
          (article1, article2) =>
            this.getPoints(article1) - this.getPoints(article2)
        );

      if (results && results.length) {
        this._modalService.openModal({
          component: SearchResultsComponent,
          data: {
            title: 'Rezultati Pretrage: ',
            results
          }
        });
      }
    }

    /*this._searchService.search(phrase).subscribe(
      response => console.log(response)
    )*/
  }

  public order(article1, article2) {
    let result1 = this.getPoints(article1);
    let result2 = this.getPoints(article2);

    return result1 - result2;
  }

  public getPoints(article) {
    let points = [1, 2, 3, 4];
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
        return article.tags.find(tag => tag === likedTag);
      })
    ) {
      result += points[2];
    }
    if (
      this.userVisitedTags.find(visitedTag => {
        return article.tags.find(tag => tag === visitedTag);
      })
    ) {
      result += points[0];
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
}
