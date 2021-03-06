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
import { ModalService } from '../../../services/modal.service';

import { AlertComponent } from '../../../shared/components/alert/alert';

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
  public isRequestPending = false;

  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _articlesService: ArticlesService,
    private _loaderService: LoaderService,
    private _location: Location,
    private _notifyService: NotifyService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _authService: AuthService,
    private _userDataService: UserDataService,
    private _modalService: ModalService,
    private _ngZone: NgZone
  ) {
    this._subscribeToArticleFetchedEvent();
  }

  ngOnInit() {
    this._subscribeToAuthStatusChange();
    this._subscribeToLikeResponseEvent();
    this._subscribeToDislikeResponseStatus();
    this._user = this._authService.getUser();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
    this.isViewDestroyed = true;
  }

  private _subscribeToArticleFetchedEvent() {
    this._subscriptions.push(
      this._articlesService.fetchedSingleArticle$.subscribe(article => {
        this._ngZone.run(() => {
          this._detectChanges();
          if (article['status']) {
            this._location.back();
            return;
          }
          article['seen_times'] = '-'
          this._articlesService.increeseArticleSeenTimes(article['id']);
          this.article = this._transformHtml(article);
          this._detectChanges();
          this._subscribeToArticleUpdateEvent();
          this._loaderService.hide();
          this._detectChanges();
          if (this._updateCouner === 0) {
            $('.tooltipped').tooltip({ delay: 50 });
          }
          this._detectChanges();
        });
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
        }

        this._detectChanges();
      });
  }

  private _subscribeToAuthStatusChange() {
    this._authService.authStatusChange$.subscribe(change => {
      this._user = this._authService.getUser();
      if (this._user && !this._isAddedToVisited && this.article) {
        this._isAddedToVisited = true;
        this._userDataService.addTextToVisited(this.article.id, this._user.id);
      }
      this._detectChanges();
    });
  }

  private _subscribeToLikeResponseEvent() {
    this._articlesService.likeResponseStatus$.subscribe(
      () => (this.isRequestPending = false)
    );
  }

  private _subscribeToDislikeResponseStatus() {
    this._articlesService.dislikeResponseStatus$.subscribe(
      () => (this.isRequestPending = false)
    );
  }

  private fetchArticleUpdate(articleId) {
    this._articlesService.getArticle(articleId);
  }

  private _transformHtml(article: any) {
    const imageIndex = article.text.indexOf('<img');
    const imageEnd = article.text.indexOf('" />');

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
    if (this._user && this.isRequestPending === false) {
      this.isRequestPending = true;
      this._articlesService.like(this.article.id, this._user.id);
    } else {
      this.openAlertWindows();
    }
  }

  public disLike() {
    if (this._user && this.isRequestPending === false) {
      this.isRequestPending = true;
      this._articlesService.disLike(this.article.id, this._user.id);
    } else {
      this.openAlertWindows();
    }
  }

  public openCommentBox() {
    if (this._user) {
      this.comentBoxOpen = !this.comentBoxOpen;
      this._detectChanges();
    } else {
      this.openAlertWindows();
    }
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

  public openAlertWindows() {
    const data = {
      message: {
        body:
          'Morate biti ulogovani da biste mogli da komentarišete ili lajkujete članke',
        title: 'Upozorenje'
      }
    };

    this._modalService.openModal({
      component: AlertComponent,
      data: data
    });
  }
}
