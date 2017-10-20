import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ArticlesHTTPService } from './atricles-http.service';

@Injectable()
export class ArticlesService {
  allArticles: any;
  private _openArticle = new Subject();
  public openArticle$ = this._openArticle.asObservable(); // fali zagrada

  constructor(
    private _articlesHTTPService: ArticlesHTTPService
  ) {}

  public getArticle(id) {
    this._articlesHTTPService.getArticle(id).subscribe(
      article => this.openArticle(article),
      error => console.error(error)
    );
  }

  public getAllArticle(){
    this._articlesHTTPService.getAllArticles().subscribe(
      articles => this.openArticle(articles),
      error => console.log(error)
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

  private openArticle(article) {
    this._openArticle.next(article);
  }
}
