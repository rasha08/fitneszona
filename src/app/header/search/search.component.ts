import { Component } from "@angular/core";

import { SearchService } from "../../services/search.service";
import { ArticlesService } from "../../services/articles.service";

import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: "app-search",
  templateUrl: "./search.html"
})
export class SearchComponent {
    private _sendToSearchService = new Subject();
    public sendToSearchService$ = this._sendToSearchService.asObservable();
    private _subscription: Subscription;
    public searchResult;
    public errorMessage;
    public result;

  constructor(
    private _searchService: SearchService,
    private _articlesService: ArticlesService
  ) { }

  search(phrase){
    this._subscription = this._sendToSearchService
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap( phrase => this._searchService.getTextsAndTitles(phrase))
      .catch(error => this.errorMessage)
      .subscribe(
        result => this.result = result,
        error => console.log(error)
      );
      
  }

}
