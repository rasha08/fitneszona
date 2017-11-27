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
       let pattern = new RegExp(`${phrase}`,'i');
       let articlesWithPhrase =  articles.filter( (article) => pattern.test(article.title) );
       return articlesWithPhrase;
    }

    public filterByText(phrase, articles){
        let pattern = new RegExp(`${phrase}`,'i');
        let articlesWithPhrase = articles.filter( (article) => pattern.test(article.text) );
        return articlesWithPhrase;
    }

    public filterByDescription(phrase,articles){
        let pattern = new RegExp(`${phrase}`,'i');
        console.log(pattern)
        let articlesWithPhrase = articles.filter( (article) =>  pattern.test(article.description) );
        return articlesWithPhrase;
    }

    public filterArticles(phrase, articles){
        let articlesWithPhraseInTitle = this.filterByTitle(phrase, articles);
        let articlesWithPhraseInDescription = this.filterByDescription(phrase, articles);
        console.log(articlesWithPhraseInDescription, articlesWithPhraseInTitle);
        return articlesWithPhraseInTitle.concat(articlesWithPhraseInDescription);
    }

    public search(phrase){
        return this._articlesHTTPService.search(phrase).map(
            articles => articles
        )
    }

}