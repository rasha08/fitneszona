import { Component, OnDestroy } from "@angular/core";

import { SearchService } from "../../services/search.service";
import { ArticlesService } from "../../services/articles.service";
import { AuthService } from "../../services/auth.service"

import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { importExpr } from "@angular/compiler/src/output/output_ast";


@Component({
  selector: "app-search",
  templateUrl: "./search.html"
})
export class SearchComponent {
    private _sendToSearchService = new Subject();
    public sendToSearchService$ = this._sendToSearchService.asObservable();
    private _subscription: Subscription[] = [];
    public searchResult;
    public errorMessage;
    public result;
    private _userLikedCategories;
    private _userLikedTags;
    private _userVisitedCtegories;
    private userVisitedTags;
    public allArticles;

  constructor(
    private _searchService: SearchService,
    private _articlesService: ArticlesService,
    private _authService: AuthService
  ) { }

  ngOnDestroy(){
    this._subscription.forEach(subscription => subscription.unsubscribe());
  }

  search1(phrase){
    this._subscription.push(this._sendToSearchService
      .subscribe(
        result => this.result = result,
        error => console.log(error)
      )
    )
  }

  subscribeToAllArticlesFetchEvent(){
    this._subscription.push(this._articlesService.allArticlesStateChange$.subscribe(
      notification => this.allArticles = this._articlesService.allArticles
    ));
  }

  search(event, phrase){
    event.stopPropagation();
    if (event.keyCode === 13) {
        
    }
    /*this._searchService.search(phrase).subscribe(
      response => console.log(response)
    )*/
  }

  public order(article1, article2){
    let result1 = this.getPoints(article1);
    let result2 = this.getPoints(article2);

    return result1 - result2;
  }

  public getPoints(article){
    let points = [1,2,3,4];
    let result = 0;
    if (this._userLikedCategories.find(likedCategory => likedCategory === article.category)){
      result += points[3]; 
    }
    if(this._userVisitedCtegories.find(visitedCategory => visitedCategory === article.category)){
      result += points[1];
    }
    if (this._userLikedTags.find(
      (likedTag) => {
        return article.tags.find(tag => tag === likedTag);
      })
    ){
      result += points[2];
    }
    if (this.userVisitedTags.find(
      (visitedTag) => {
        return article.tags.find(tag => tag === visitedTag);
    })){
      result += points[0];
    }

    return result;
  }

  private _getUserLikedTags(){
    return this._authService.getUser()['liked_tags'];
  }

  private _getUserLikedCategories(){
    return this._authService.getUser()['liked_categories'];
  }

  private _getUserVisitedCategories(){
    return this._authService.getUser()['visited_categories'];
  }

  private _getUserVisitedTags(){
    return this._authService.getUser()['visited_tags'];
  }

}
