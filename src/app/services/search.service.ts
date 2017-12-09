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
        console.log(articles);
        phrase = phrase.replace(/s/gi, '[šs]').replace(/c/gi,'[cćč]').replace(/z/gi,'[zž]');
        const pattern = new RegExp(`\\b${phrase}\\b`, 'i');
        console.log(pattern);
        let result = [];
        let filteredArticles = [];
        for (let article of articles){
            if (!this.isArticleAlreadyInArray(article.article_title_url_slug, filteredArticles)){
                if (pattern.test(article.title)) {
                    filteredArticles.push(article.article_title_url_slug);
                    article['foundIn'] = 'title';
                    result.push(article);
                } else if (pattern.test(article.text)) {
                    filteredArticles.push(article.article_title_url_slug);
                    article['foundIn'] = 'text';
                    result.push(article);
                }
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
