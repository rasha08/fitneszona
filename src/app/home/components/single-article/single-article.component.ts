import {
  Component,
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
export class SingleArticleComponent implements OnInit, OnDestroy {
  public article;
  private _user;
  private _updateCouner = 0;
  private _isAddedToVisited = false;
  public comentBoxOpen = false;
  public commentText = '';
  public listOfLikes = '';
  public listOfDislikes = '';
  public isViewDestroyed = false;

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
    this._user = this._authService.getUser();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
    this.isViewDestroyed = true;
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
        this._detectChanges();
        if (this._updateCouner === 0) {
          $('.tooltipped').tooltip({ delay: 50 });
        }
      })
    );
  }

  private _subscribeToArticleUpdateEvent() {
    this._notifyService
      .subscribeToArticleChanges(this.article.subscriptionId)
      .on('value', update => {
        const updateObject = JSON.parse(update.val());
        this._updateCouner += 1;
        if (updateObject.change === 'action' && this._shouldUpdateArticle()) {
          Object.assign(this.article, JSON.parse(updateObject.payload));
          this._populateListOfLikes(this.article);
          this._populateListOfDislikes(this.article);
        }  else if (this._shouldUpdateArticle()) {
          this.fetchArticleUpdate(this.article.id);
        }

        this._detectChanges();
      });
  }

  private _subscribeToAuthStatusChange() {
    this._authService.authStatusChange$.subscribe(change => {
      this._user = this._authService.getUser();
      if (this._user && !this._isAddedToVisited) {
        this._isAddedToVisited = true;
        this._userDataService.addTextToVisited(this.article.id, this._user.id);
      }
      this._detectChanges();
    });
  }

  private fetchArticleUpdate(articleId) {
    this._articlesService.getArticle(articleId).subscribe(article => {
      Object.assign(this.article, this._transformHtml(article));
    });
  }

  private _transformHtml(article: any) {
    const imageIndex = article.text.indexOf('<p><img');
    const imageEnd = article.text.indexOf('" /></p>');

    article['intro'] = article.text.slice(0, imageIndex);
    article.text = article.text.slice(imageEnd + 8, -1);
    this._populateListOfLikes(article);
    this._populateListOfDislikes(article);
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
    this._detectChanges();
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

  private _populateListOfLikes(article) {
    this.listOfLikes = '';
    article.likes.forEach(like => {
      this.listOfLikes += like.userName + ', ';
    });

    this.listOfLikes = this.listOfLikes.slice(0, this.listOfLikes.length - 2);
  }

  private _populateListOfDislikes(article) {
    this.listOfDislikes = '';
    article.dislikes.forEach(dislike => {
      this.listOfDislikes += dislike.userName + ', ';
    });

    this.listOfDislikes = this.listOfDislikes.slice(
      0,
      this.listOfDislikes.length - 2
    );
  }

  private _detectChanges() {
    if (!this.isViewDestroyed) {
      this._changeDetectorRef.detectChanges();
    }
  }
}
