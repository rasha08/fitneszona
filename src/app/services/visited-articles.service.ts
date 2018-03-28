import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';
@Injectable()
export class VisitedArticlesService {
  constructor(private _userDataService: UserDataService) {}

  public addArticleToSessionStorage(articleId) {
    let sessionStorageArticles = JSON.parse(
      localStorage.getItem('visitedArticles')
    );
    sessionStorageArticles = sessionStorageArticles
      ? sessionStorageArticles
      : [];
    if (sessionStorageArticles.indexOf(articleId) === -1) {
      sessionStorageArticles.push(articleId);
      localStorage.setItem(
        'visitedArticles',
        JSON.stringify(sessionStorageArticles)
      );
    }
  }

  public getSessionStorageArticles() {
    let sessionStorageArticles = JSON.parse(
      localStorage.getItem('visitedArticles')
    );

    return (sessionStorageArticles = sessionStorageArticles
      ? sessionStorageArticles
      : []);
  }

  public getArticles() {
    if (this._userDataService.userLoggedIn) {
      return this._userDataService.getUserVisitedTextsIds();
    }
    return this.getSessionStorageArticles();
  }

  public addArticleToVisited(articleId) {
    this.addArticleToSessionStorage(articleId);
  }
}
