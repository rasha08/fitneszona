import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { ArticlesService } from '../../../services/articles.service';
import { LoaderService } from '../../../services/loader.service';
import { NotifyService } from '../../../services/notify.service';

declare const $;

@Component({
  selector: 'single-article',
  templateUrl: './single-article.html'
})
export class SingleArticleComponent
  implements OnInit, OnDestroy, AfterViewInit {
  public article;
  private _updateCouner = 0;
  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _articlesService: ArticlesService,
    private _loaderService: LoaderService,
    private _location: Location,
    private _notifyService: NotifyService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._subscribeToArticleFetchedEvent();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngAfterViewInit() {
    $(document).ready(function() {
      $('.tooltipped').tooltip({ delay: 50 });
    });
  }

  private _subscribeToArticleFetchedEvent() {
    this._subscriptions.push(
      this._articlesService.fetchedSingleArticle$.subscribe(article => {
        if (article['status']) {
          this._location.back();
          return;
        }

        this.article = article;
        this._subscribeToArticleUpdateEvent();
        this._loaderService.hide();
        this._changeDetectorRef.detectChanges();
      })
    );
  }

  private _subscribeToArticleUpdateEvent() {
    this._notifyService
      .subscribeToArticleChanges(this.article.subscriptionId)
      .on('value', update => {
        this._updateCouner += 1;
        if (this._shouldUpdateArticle()) {
          this.fetchArticleUpdate(this.article.id);
        }
      });
  }

  private fetchArticleUpdate(articleId) {
    this._articlesService.getArticle(articleId).subscribe(article => {
      Object.assign(this.article, article);
      this._changeDetectorRef.detectChanges();
    });
  }

  private _shouldUpdateArticle() {
    return this._updateCouner > 1;
  }
}
