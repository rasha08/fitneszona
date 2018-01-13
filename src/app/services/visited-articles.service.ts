import { Injectable } from '@angular/core';

@Injectable()
export class VisitedArticlesService {
  public addArticleToSessionStorage(articleId) {
    let sessionStorageArticles = JSON.parse(
      sessionStorage.getItem('visitedArticles')
    );
    sessionStorageArticles = sessionStorageArticles
      ? sessionStorageArticles
      : [];
    if (sessionStorageArticles.indexOf(articleId) === -1) {
      sessionStorageArticles.push(articleId);
      sessionStorage.setItem(
        'visitedArticles',
        JSON.stringify(sessionStorageArticles)
      );
    }
  }

  public getSessionStorageArticles() {
    let sessionStorageArticles = JSON.parse(
      sessionStorage.getItem('visitedArticles')
    );

    return (sessionStorageArticles = sessionStorageArticles
      ? sessionStorageArticles
      : []);
  }

  public getArticles() {
    return this.getSessionStorageArticles();
  }

  public addArticleToVisited(articleId) {
    this.addArticleToSessionStorage(articleId);
  }
}
