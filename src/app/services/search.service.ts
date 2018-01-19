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
  ) {}

  public filterByTitle(phrase, articles, pattern) {
    const articlesWithPhrase = articles.filter(article =>
      pattern.test(article.title)
    );
    return articlesWithPhrase;
  }

  public filterByText(phrase, articles, pattern) {
    const articlesWithPhrase = articles.filter(article =>
      pattern.test(article.text)
    );
    return articlesWithPhrase;
  }

  public filterArticles(phrase, articles) {
    const pattern = new RegExp(
      `\\b${this._formatStringForSearch(phrase)}\\b`,
      'i'
    );
    const result = [];
    const filteredArticles = [];
    if (!articles) {
      return [];
    }
    for (const article of articles) {
      if (pattern.test(this._formatStringForSearch(article.title))) {
        article['foundIn'] = 'title';
        result.push(article);
      } else if (pattern.test(this._formatStringForSearch(article.text))) {
        article['foundIn'] = 'text';
        result.push(article);
      }
    }
    return result;
  }

  isArticleAlreadyInArray(urlSlug, array) {
    const index = array.indexOf(urlSlug);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }
  private _formatStringForSearch(text) {
    return text
      .toLowerCase()
      .replace(/š/g, 's')
      .replace(/č/g, 'c')
      .replace(/ć/g, 'c')
      .replace(/ž/g, 'z')
      .replace(/đ/g, 'dj');
  }

  public search(phrase) {
    return this._articlesHTTPService.search(phrase).map(articles => articles);
  }
}
