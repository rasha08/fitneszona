import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ArticlesHTTPService } from './atricles-http.service';

@Injectable()
export class ArticlesService {
  private _openArticle = new Subject();
  public openArticle$ = this._openArticle.asObservable;

  constructor(
    private _articlesHTTPService: ArticlesHTTPService
  ) {}

  public getArticle(id) {
    this._articlesHTTPService.getArticle(id).subscribe(
      article => this.openArticle(article),
      error => console.error(error)
    );
  }

  private openArticle(article) {
    this._openArticle.next(article);
  }
}
