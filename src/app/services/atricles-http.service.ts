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
          }, 500)
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
          }, 800)
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
          }, 800)
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
          }, 800)
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
            }, 800)
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
            setTimeout(() => this.getTopArticlesForCategory(category), 800);
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
            setTimeout(() => this.getLatestArticlesForCategory(category), 800);
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
              800
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
          }, 800)
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
            }, 800)
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
          }, 800)
        )
    );
  }

  public getAllArticlesWithText() {
    return this._http.get(`${this.BASE_URL}/api/search`).map(
      result => result.json().articles,
      error =>
        this._ngZone.runOutsideAngular(() =>
          setTimeout(() => {
            this.getAllArticlesWithText();
          }, 3500)
        )
    );
  }

  public search(phrase) {
    return this._http.post(`${this.BASE_URL}/api/search`, phrase).map(
      result => result,
      error =>
        this._ngZone.runOutsideAngular(() =>
          setTimeout(() => {
            this.search(phrase);
          }, 800)
        )
    );
  }

  public action(body, id) {
    return this._http
      .post(`https://fitneszona.rs/api/articles/${id}`, body)
      .map(
        result => result,
        error =>
          this._ngZone.runOutsideAngular(() =>
            setTimeout(() => {
              this.action(body, id);
            }, 800)
          )
      );
  }
}
