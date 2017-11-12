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

declare const $;

@Component({
  selector: 'category',
  templateUrl: './category.html'
})
export class CategoryComponent implements AfterViewInit, OnInit, OnDestroy {
  public articles;
  private _subscriptions: Array<Subscription> = [];
  constructor(
    private _articlesService: ArticlesService,
    private _notifyService: NotifyService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}
  ngAfterViewInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  }

  ngOnInit() {
    this._listenToArticlesFetched();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  private _listenToArticlesFetched() {
    this._subscriptions.push(
      this._articlesService.fetchedCategoryArticles$.subscribe(articles => {
        console.log(articles);
      })
    );
  }
}
