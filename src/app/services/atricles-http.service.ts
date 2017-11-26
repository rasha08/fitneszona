import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {} from 'module';
@Injectable()
export class ArticlesHTTPService {
  private BASE_URL = 'https://fitneszona.rs';
  constructor(private _http: Http, private _ngZone: NgZone) {}

  public getAllArticles() {
    return this._http.get(`${this.BASE_URL}/api/articles/all`).map(
      result => result.json(),
      error =>
        this._ngZone.runOutsideAngular(() =>
          setTimeout(() => {
            this.getAllArticles();
          }, 100)
        )
    );
  }

  public getTopArticles() {
    return this._http.get(`${this.BASE_URL}/api/articles/top`).map(
      result => result.json(),
      error =>
        this._ngZone.runOutsideAngular(() =>
          setTimeout(() => {
            this.getTopArticles();
          }, 300)
        )
    );
  }

  public getLatestArticles() {
    return this._http.get(`${this.BASE_URL}/api/articles/latest`).map(
      result => result.json(),
      error =>
        this._ngZone.runOutsideAngular(() =>
          setTimeout(() => {
            this.getLatestArticles();
          }, 300)
        )
    );
  }

  public getIndexPageArticles() {
    return this._http.get(`${this.BASE_URL}/api/articles/index`).map(
      result => result.json(),
      error =>
        this._ngZone.runOutsideAngular(() =>
          setTimeout(() => {
            this.getIndexPageArticles();
          }, 300)
        )
    );
  }

  public getArticlesForCategory(category) {
    return this._http
      .get(`${this.BASE_URL}/api/articles/category/${category}`)
      .map(
        result => result.json(),
        error =>
          this._ngZone.runOutsideAngular(() =>
            setTimeout(() => {
              this.getArticlesForCategory(category);
            }, 300)
          )
      );
  }

  public getTopArticlesForCategory(category) {
    return this._http
      .get(`${this.BASE_URL}/api/articles/category/${category}/top`)
      .map(
        result => result.json(),
        error => {
          this._ngZone.runOutsideAngular(() => {
            setTimeout(() => this.getTopArticlesForCategory(category), 300);
          });
        }
      );
  }

  public getLatestArticlesForCategory(category) {
    return this._http
      .get(`${this.BASE_URL}/api/articles/category/${category}/latest`)
      .map(
        result => result.json(),
        error => {
          this._ngZone.runOutsideAngular(() => {
            setTimeout(() => this.getLatestArticlesForCategory(category), 300);
          });
        }
      );
  }

  public getArticleByURLSlug(article_title_url_slug) {
    return this._http
      .get(`${this.BASE_URL}/api/articles/${article_title_url_slug}`)
      .map(
        result => result.json(),
        error => {
          this._ngZone.runOutsideAngular(() => {
            setTimeout(
              () => this.getArticleByURLSlug(article_title_url_slug),
              300
            );
          });
        }
      );
  }

  public getArticle(id) {
    return this._http.get(`${this.BASE_URL}/api/articles/${id}`).map(
      result => result.json(),
      error =>
        this._ngZone.runOutsideAngular(() =>
          setTimeout(() => {
            this.getArticle(id);
          }, 300)
        )
    );
  }

  public getArticleCategoryAndTags(id) {
    return this._http
      .get(`${this.BASE_URL}/api/articles/${id}/catgory-and-tags`)
      .map(
        result => result.json(),
        error =>
          this._ngZone.runOutsideAngular(() =>
            setTimeout(() => {
              this.getArticleCategoryAndTags(id);
            }, 300)
          )
      );
  }

  public getArticlesByDate() {
    return this._http.get(`${this.BASE_URL}`).map(
      result => result.json(),
      error =>
        this._ngZone.runOutsideAngular(() =>
          setTimeout(() => {
            this.getArticlesByDate();
          }, 300)
        )
    );
  }

  public search(phrase) {
    console.log(
      'https://fitneszona.rs/api/search' == `${this.BASE_URL}/api/search`
    );
    return this._http.post(`${this.BASE_URL}/api/search`, phrase).map(
      //ruta mora da se popravi
      result => result,
      error => console.log(error)
    );
  }

  public action(body, id) {
    this._http
      .post(`https://fitneszona.rs/api/articles/${id}`, body)
      .map(
        result => result,
        error =>
          this._ngZone.runOutsideAngular(() =>
            setTimeout(() => {
              this.action(body, id);
            }, 300)
          )
      )
      .subscribe();
  }
}
