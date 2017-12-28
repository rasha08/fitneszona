import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserDataService } from './user-data.service';

import {} from 'module';
@Injectable()
export class ArticlesHTTPService {
  private BASE_URL = 'https://fitneszona.rs';
  constructor(
    private _http: Http, 
    private _ngZone: NgZone,
    private _userDataService: UserDataService
  ) {}

  public getAllArticles() {
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/articles/all`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http.get(url).map(
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/articles/top`;
    if (userId !== false){
      url += `?uid=${userId}`;
    }
    return this._http.get(url).map(
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/articles/latest`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http.get(url).map(
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/articles/index`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http.get(url).map(
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/articles/category/${category}`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http
      .get(url)
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/articles/category/${category}/top`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http
      .get(url)
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/articles/category/${category}/latest`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http
      .get(url)
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/articles/${article_title_url_slug}`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http
      .get(url)
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/articles/${id}`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http.get(url).map(
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/articles/${id}/catgory-and-tags`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http
      .get(url)
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http.get(url).map(
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/search`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http.get(url).map(
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
    let userId = this.getUserId() || false;
    let url = `${this.BASE_URL}/api/search`;
    if (userId !== false) {
      url += `?uid=${userId}`;
    }
    return this._http.post(url, phrase).map(
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
    let userId = this.getUserId() || false;
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

  getUserId(){
    let user = this._userDataService.getUser() || false;
    if (user) {
      return user['id'];
    }
    return false;
  }
}
