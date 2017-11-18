import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ArticlesService } from '../../../services/articles.service';
import { NotifyService } from '../../../services/notify.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'specific-categories',
  templateUrl: './specific-categories.html'
})
export class SpecificCategoriesComponent {
  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _articlesService: ArticlesService,
    private _notifyService: NotifyService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _loaderService: LoaderService
  ) {}

  ngOnInit() {
    this._listenToArticlesFetched();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  private _listenToArticlesFetched() {
    this._subscriptions.push(
      this._articlesService.specificCategoryArticlesFetched$.subscribe(
        articles => {
          console.log(articles);
          this._loaderService.hide();
        }
      )
    );
  }
}
