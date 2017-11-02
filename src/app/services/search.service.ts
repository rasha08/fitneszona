import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime'

import { ArticlesHTTPService } from "./atricles-http.service";


@Injectable()

export class SearchService {

    private _searchArticle = new Subject();

    constructor(
        private _articlesHTTPService: ArticlesHTTPService
    ) { }

    public filterByTitle(phrase, articles){
       let articlesWithPhrase =  articles.filter( (article) => article.title.indexOf(phrase) !== -1 );
       return articlesWithPhrase;
    }

    public filterByText(phrase, articles){
        let articlesWithPhrase = articles.filter( (article) => article.text.indexOf(phrase) !== -1 );
        return articlesWithPhrase;
    }

    public filterByDescription(phrase,articles){
        let articlesWithPhrase = articles.filter( (article) => article.indexOf(phrase) !== -1 );
        return articlesWithPhrase;
    }

    public filterArticles(phrase, articles){
        let articlesWithPhraseInTitle = this.filterByTitle(phrase, articles);
        let articlesWithPhraseInText = this.filterByTitle(phrase, articles);
        return articlesWithPhraseInTitle.concat(articlesWithPhraseInText); 
    }

    public search(phrase){
        return this._articlesHTTPService.search(phrase).map(
            articles => articles
        )
    }

}