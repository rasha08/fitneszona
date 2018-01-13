import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoaderService } from '../../services/loader.service';
import { ArticlesService } from '../../services/articles.service';
import { resolve } from 'q';

@Injectable()
export class SingleArticleResolver implements Resolve<any> {
  constructor(
    private _articleService: ArticlesService,
    private _loaderSerice: LoaderService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this._loaderSerice.show();
    const text = route.params.text;

    console.log('RESOLVER');
    this._articleService.getArticle(text);
    console.log('RESOLVER DONE');

    return true;
  }
}
