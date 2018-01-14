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
    this._articleService.mutateOpenPageState(route.data.type);

    return true;
  }
}
