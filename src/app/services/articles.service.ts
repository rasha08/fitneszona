import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ConfigurationService } from './configuration.service';
import { ArticlesHTTPService } from './atricles-http.service';

@Injectable()
export class ArticlesService {
  public allArticles;
  private _openArticle = new Subject();
  public openArticle$ = this._openArticle.asObservable();

  private _allArticlesFetched = new Subject();
  public allArticlesStateChange$ = this._allArticlesFetched.asObservable();

  private _fetchedCategoryArticles = new Subject();
  public fetchedCategoryArticles$ = this._fetchedCategoryArticles.asObservable();

  private _specificCategoryArticlesFetched = new Subject();
  public specificCategoryArticlesFetched$ = this._specificCategoryArticlesFetched.asObservable();

  private _singleArticleFetched = new Subject();
  public fetchedSingleArticle$ = this._singleArticleFetched.asObservable();

  constructor(
    private _articlesHTTPService: ArticlesHTTPService,
    private _configurationService: ConfigurationService,
    private _ngZone: NgZone
  ) {
    this._configurationService.configurationStatusChange$.subscribe(() => {
      if (!this.allArticles) {
        this.getAllArticles();
      }
    });
  }

  public getArticle(id) {
    return this._articlesHTTPService.getArticle(id);
  }

  public getAllArticles() {
    this._articlesHTTPService.getAllArticles().subscribe(
      articles => {
        this.allArticles = articles;
        this.allArticlesStateChange(true);
      },
      error => console.log('Error: ', error)
    );
  }

  public getTopArticles() {
    return this._articlesHTTPService.getTopArticles();
  }

  public getLatestArticles() {
    return this._articlesHTTPService.getLatestArticles();
  }

  public getArticlesForCategory(category) {
    return this._articlesHTTPService.getArticlesForCategory(category);
  }

  public getTopArticlesForCategory(category) {
    this._articlesHTTPService
      .getTopArticlesForCategory(category)
      .subscribe(
        articles => this.openArticle(articles),
        error => console.log(error)
      );
  }

  public getLatestArticlesForCategory(category) {
    this._articlesHTTPService
      .getLatestArticlesForCategory(category)
      .subscribe(
        articles => this.openArticle(articles),
        error => console.log(error)
      );
  }

  public getArticleCategoryAndTags(id) {
    //greska sa json token at position 1 sa id = 13 -ko bi rekao
    this._articlesHTTPService
      .getArticleCategoryAndTags(id)
      .subscribe(
        articles => this.openArticle(articles),
        error => console.log(error)
      );
  }

  public getArticleByURLSlug(article_title_url_slug) {
    this._articlesHTTPService
      .getArticleByURLSlug(article_title_url_slug)
      .subscribe(
        article => this.openArticle(article),
        error => console.log(error)
      );
  }

  private openArticle(article) {
    this._openArticle.next(article);
  }

  private allArticlesStateChange(param) {
    this._allArticlesFetched.next(param);
  }

  public getArticlesByTagName(tag, limit = 200) {
    let numOfArticlesReturned = 0;
    return this.allArticles.filter(article => {
      if (article.tags.indexOf(tag) !== -1 && numOfArticlesReturned < limit) {
        numOfArticlesReturned += 1;
        return true;
      }

      return false;
    });
  }

  public orderByTimeOfUpdate(articles = []) {
    return articles.sort(
      (a, b) =>
        -(new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime())
    );
  }

  public ariclesFetchedForCategory(articles) {
    this._fetchedCategoryArticles.next(articles);
  }

  public articlesFetchedForSpecificCategory(articles) {
    this._specificCategoryArticlesFetched.next(articles);
  }

  public singleArticleFetched(article) {
    this._singleArticleFetched.next(article);
  }

  public inceraseSeanTimes(textId) {
    const data = {
      action: 'setSeenTimes'
    };

    this._articlesHTTPService.action(data, textId);
  }

  public like(textId, userId) {
    const data = {
      action: 'like',
      userId: userId
    };

    this._articlesHTTPService.action(data, textId);
  }

  public disLike(textId, userId) {
    const data = {
      action: 'dislike',
      userId: userId
    };

    this._articlesHTTPService.action(data, textId);
  }

  public comment(textId, userId, comment) {
    const data = {
      action: 'comment',
      userId,
      comment
    };

    this._articlesHTTPService.action(data, textId);
  }
}
