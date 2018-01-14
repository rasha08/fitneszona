import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { UserHTTPService } from '../../../../services/user-http.service';

declare const $: any;

@Injectable()
export class ReplacmentListService {
  private _replacmentListStateChange = new Subject();
  public replacmentListStateChange$ = this._replacmentListStateChange.asObservable();
  private _replaceTagListNotification = new Subject();
  public replaceTagListNotification$ = this._replaceTagListNotification.asObservable();
  private _isReplacmentListOpen = false;

  constructor(private _http: Http, private _userHTTPService: UserHTTPService) {}

  public toggleReplacmentListState(tag, index) {
    this._replacmentListStateChange.next([tag, index]);
    this.toggleReplacmentListStyle();
  }

  public initialiseUserTagsInLeftSidebar(id, tags) {
    this._userHTTPService
      .initilaiseUserTagsInLeftSidebar(id, tags)
      .subscribe(response => {}, error => {});
  }

  public replaceUserTagInSidebar(id, tag, index) {
    this._userHTTPService
      .replaceUserTagInSidebar(id, tag, index)
      .subscribe(response => {}, error => {});
  }

  public notifyTagReplacment(newTag, oldTagIndex) {
    this._replaceTagListNotification.next([newTag, oldTagIndex]);
    this.toggleReplacmentListStyle();
  }

  public toggleReplacmentListStyle() {
    if (this._isReplacmentListOpen) {
      $('#replacment-list').removeClass('open');
    } else {
      $('#replacment-list').addClass('open');
    }

    this._isReplacmentListOpen = !this._isReplacmentListOpen;
  }
}
