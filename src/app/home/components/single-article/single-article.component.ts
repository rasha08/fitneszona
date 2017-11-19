import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { ArticlesService } from '../../../services/articles.service';
import { LoaderService } from '../../../services/loader.service';
import { NotifyService } from '../../../services/notify.service';
import { AuthService } from '../../../services/auth.service';
import { UserDataService } from '../../../services/user-data.service';

declare const $;

@Component({
  selector: 'single-article',
  templateUrl: './single-article.html'
})
export class SingleArticleComponent
  implements OnInit, OnDestroy, AfterViewInit {
  public article;
  private _user;
  private _updateCouner = 0;
  private _isAddedToVisited = false;
  public comentBoxOpen = false;
  public commentText = '';
  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _articlesService: ArticlesService,
    private _loaderService: LoaderService,
    private _location: Location,
    private _notifyService: NotifyService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _authService: AuthService,
    private _userDataService: UserDataService,
    private _ngZone: NgZone
  ) {}

  ngOnInit() {
    this._subscribeToArticleFetchedEvent();
    this._subscribeToAuthStatusChange();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngAfterViewInit() {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  private _subscribeToArticleFetchedEvent() {
    this._subscriptions.push(
      this._articlesService.fetchedSingleArticle$.subscribe(article => {
        if (article['status']) {
          this._location.back();
          return;
        }

        this.article = this._transformHtml(article);
        this._subscribeToArticleUpdateEvent();
        this._loaderService.hide();
        this._changeDetectorRef.detectChanges();
        this._articlesService.inceraseSeanTimes(this.article.id);
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

  private _subscribeToAuthStatusChange() {
    this._authService.authStatusChange$.subscribe(change => {
      this._user = this._authService.getUser();
      if (this._user && !this._isAddedToVisited) {
        this._isAddedToVisited = true;
        this._userDataService.addTextToVisited(this.article.id, this._user.id);
      }
      this._changeDetectorRef.detectChanges();
    });
  }

  private fetchArticleUpdate(articleId) {
    this._articlesService.getArticle(articleId).subscribe(article => {
      Object.assign(this.article, this._transformHtml(article));
      this._changeDetectorRef.detectChanges();
    });
  }

  private _transformHtml(article: any) {
    const imageIndex = article.text.indexOf('<p><img');
    const imageEnd = article.text.indexOf('" /></p>');

    article['intro'] = article.text.slice(0, imageIndex);
    article.text = article.text.slice(imageEnd + 8, -1);

    return article;
  }

  private _shouldUpdateArticle() {
    return this._updateCouner > 1;
  }

  public hasUSerLikedTag(tag) {
    return (
      this._user && this._user.liked_tags.indexOf(tag.toLowerCase()) !== -1
    );
  }

  public likeOrUnlikeTag(tag) {
    if (this._user) {
      this._userDataService.likeTag(tag, this._user.id);
    }
  }

  public like() {
    if (this._user) {
      this._articlesService.like(this.article.id, this._user.id);
    }
  }

  public disLike() {
    if (this._user) {
      this._articlesService.disLike(this.article.id, this._user.id);
    }
  }

  public openCommentBox() {
    this.comentBoxOpen = !this.comentBoxOpen;
    this._changeDetectorRef.detectChanges();
  }

  public comment() {
    if (this._user && this.commentText.length > 3) {
      this._articlesService.comment(
        this.article.id,
        this._user.id,
        this.commentText
      );
    }

    this.openCommentBox();
  }
}
