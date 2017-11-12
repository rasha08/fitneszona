import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {} from '';

import { ArticlesService } from '../../services/articles.service';

@Injectable()
export class CategoryResolver implements Resolve<any> {
  constructor(private _articleService: ArticlesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const category = route.params.category;
    return this._articleService
      .getArticlesForCategory(category)
      .subscribe(articles =>
        this._articleService.ariclesFetchedForCategory(articles)
      );
  }
}
