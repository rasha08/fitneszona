import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {  } from "module";
@Injectable()
export class ArticlesHTTPService {
  private BASE_URL = 'https://fitneszona.rs';
  constructor(
    private _http: Http
  ) {}

  public getAllArticles() {
    return this._http.get(`${this.BASE_URL}/api/articles/all`)
      .map(
        result => result.json(),
        error => console.error(error)
      );
  }

  public getTopArticles() {
    return this._http.get(`${this.BASE_URL}/api/articles/top`)
      .map(
        result => result.json(),
        error => console.error(error)
      );
  }

  public getLatestArticles() {
    return this._http.get(`${this.BASE_URL}/api/articles/latest`)
      .map(
        result => result.json(),
        error => console.error(error)
      );
  }

  public getArticlesForCategory(category) {
    return this._http.get(`${this.BASE_URL}/api/articles/category/${category}`)
      .map(
        result => result.json(),
        error => console.error(error)
      );
  }

  public getTopArticlesForCategory(category) {
    return this._http.get(`${this.BASE_URL}/api/articles/category/${category}/top`)
      .map(
        result => result.json(),
        error => console.error(error)
      );
  }

  public getLatestArticlesForCategory(category) {
    return this._http.get(`${this.BASE_URL}/api/articles/category/${category}/latest`)
      .map(
        result => result.json(),
        error => console.error(error)
      );
  }

  public getArticleByURLSlug(article_title_url_slug){
    console.log('Adress:', `${this.BASE_URL}/api/articles/${article_title_url_slug}`)
    return this._http.get(`${this.BASE_URL}/api/articles/${article_title_url_slug}`)
      .map(
        result => result.json(),
        error => console.log(error)
      )
  }

  public getArticle(id) {
    return this._http.get(`${this.BASE_URL}/api/articles/${id}`)
      .map(
        result => result.json(),
        error => console.error(error)
      );
  }

  public getArticleCategoryAndTags(id) {
    return this._http.get(`${this.BASE_URL}/api/articles/${id}/catgory-and-tags`)
      .map(
        result => result.json(),
        error => console.error(error)
      );
  }

  public getArticlesByDate(){
    return this._http.get(`${this.BASE_URL}`).
      map(
        result => result.json(),
        error => console.log(error)
      )
  }


  public search(phrase){
    console.log('https://fitneszona.rs/api/search' == `${this.BASE_URL}/api/search`)
    return this._http.post(`${this.BASE_URL}/api/search`,phrase).map( //ruta mora da se popravi
      result => result,
      error => console.log(error)
    )
  }
  

  
}
