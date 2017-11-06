import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ArticlesHTTPService } from './atricles-http.service';

@Injectable()
export class ArticlesService {
  public allArticles;
  private _openArticle = new Subject();
  public openArticle$ = this._openArticle.asObservable();

  private _allArticlesFetched = new Subject();
  public allArticlesStateChange$ = this._allArticlesFetched.asObservable();

  constructor(
    private _articlesHTTPService: ArticlesHTTPService,
    private _ngZone: NgZone
  ) {
    this._ngZone.runOutsideAngular(() => this.getAllArticles());
  }

  public getArticle(id) {
    this._articlesHTTPService.getArticle(id).subscribe(
      article => this.openArticle(article),
      error => console.error(error)
    );
  }

  public getAllArticles() {
    this._articlesHTTPService.getAllArticles().subscribe(
      articles => {
        this.allArticles = articles;
        this.allArticlesStateChange(true);
      },
      error => console.log('Error: ',error)
    )
  }

  public getTopArticles(){
    this._articlesHTTPService.getTopArticles().subscribe(
      articles => this.openArticle(articles),
      error => console.log(error)
    )
  }

  public getLatestArticles(){
    this._articlesHTTPService.getLatestArticles().subscribe(
      articles => this.openArticle(articles),
      error => console.log(error)
    )
  }

  public getArticlesForCategory(category){
    this._articlesHTTPService.getArticlesForCategory(category).subscribe(
      articles => this.openArticle(articles),
      error => console.log(error)
    )
  }

  public getTopArticlesForCategory(category){
    this._articlesHTTPService.getTopArticlesForCategory(category).subscribe(
      articles => this.openArticle(articles),
      error => console.log(error)
    )
  }

  public getLatestArticlesForCategory(category){
    this._articlesHTTPService.getLatestArticlesForCategory(category).subscribe(
      articles => this.openArticle(articles),
      error => console.log(error)
    )
  }

  public getArticleCategoryAndTags(id){ //greska sa json token at position 1 sa id = 13 -ko bi rekao
    this._articlesHTTPService.getArticleCategoryAndTags(id).subscribe(
      articles => this.openArticle(articles),
      error => console.log(error)
    )
  }

  public getArticleByURLSlug(article_title_url_slug){
    this._articlesHTTPService.getArticleByURLSlug(article_title_url_slug).subscribe(
      article => this.openArticle(article),
      error => console.log(error)
    )
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
    return articles.sort((a, b) => -((new Date(a.updated_at).getTime()) - (new Date(b.updated_at).getTime())));
  }
}
