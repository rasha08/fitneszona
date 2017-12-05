import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime'

import { ArticlesHTTPService } from "./atricles-http.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable()

export class SearchService {

    private _searchArticle = new Subject();

    constructor(
        private _articlesHTTPService: ArticlesHTTPService,
        private _localStorageService: LocalStorageService
    ) { }

    public filterByTitle(phrase, articles, pattern){
       let articlesWithPhrase =  articles.filter( (article) => pattern.test(article.title) );
       return articlesWithPhrase;
    }

    public filterByText(phrase, articles, pattern){
        let articlesWithPhrase = articles.filter( (article) => pattern.test(article.text) );
        return articlesWithPhrase;
    }

    public filterArticles(phrase, articles){
        phrase = phrase.replace(/s/gi, '[šs]').replace(/c/gi,'[cćč]').replace(/z/gi,'[zž]');
        let pattern = new RegExp(`\\b${phrase}\\b`, 'i');
        let articlesWithPhraseInTitle = this.filterByTitle(phrase, articles, pattern);
        let articlesWithPhraseInText = this.filterByText(phrase, articles, pattern);
        return articlesWithPhraseInTitle.concat(articlesWithPhraseInText);
    }

    public search(phrase){
        return this._articlesHTTPService.search(phrase).map(
            articles => articles
        )
    }

}