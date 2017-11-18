import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoaderService } from '../../services/loader.service';
import { ArticlesService } from '../../services/articles.service';

@Injectable()
export class SpecificCategoryResolver implements Resolve<any> {
  constructor(
    private _articleService: ArticlesService,
    private _loaderSerice: LoaderService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this._loaderSerice.show();
    const category = route.params.category;
    if (route.data.type === 'latest') {
      return this._articleService
        .getLatestArticles()
        .subscribe(articles =>
          this._articleService.articlesFetchedForSpecificCategory(articles)
       );
    } else {
      return this._articleService
      .getTopArticles()
      .subscribe(articles =>
        this._articleService.articlesFetchedForSpecificCategory(articles)
     );
    }
  }
}
