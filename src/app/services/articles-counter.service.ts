import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";


import { ArticleCounterHTTPService } from "./articles-counter-http.service";
import { UserHTTPService } from "./user-http.service";
@Injectable()

export class ArticlesCounterService{
    private _sendCategoriesToBottomHeader = new Subject();
    public sendCategoriesToBottomHeader$ = this._sendCategoriesToBottomHeader.asObservable();

    constructor(
        private _articlesCounterHTTPService: ArticleCounterHTTPService,
        private _userHTTPService: UserHTTPService
    ){ }

    getCategoriesWithNewArticles(timestring: string){
        this._articlesCounterHTTPService.getCategoriesWithNewArticles(timestring).subscribe(
            response => {this.sendNumberOfNewArticlesToHeader(response);console.log('Article: ',response)},
            error => console.log(error)
        );
    }

    sendNumberOfNewArticlesToHeader(data: object){
        this._sendCategoriesToBottomHeader.next(data);
    }

    
}
