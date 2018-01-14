import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import { ArticlesHTTPService } from './atricles-http.service';
import { LocalStorageService } from './local-storage.service';

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
        const pattern = new RegExp(`\\b${phrase}\\b`, 'i');
        const result = [];
        const filteredArticles = [];
        for (const article of articles){
            if (pattern.test(article.title)) {
                article['foundIn'] = 'title';
                result.push(article);
            } else if (pattern.test(article.text)) {
                article['foundIn'] = 'text';
                result.push(article);
            }

        }
        return result;
    }

    isArticleAlreadyInArray(urlSlug, array) {
        const index = array.indexOf(urlSlug);
        if ( index === -1) {
            return false;
        }else {
            return true;
        }
    }

    public search(phrase) {
        return this._articlesHTTPService.search(phrase).map(
            articles => articles
        );
    }
}
