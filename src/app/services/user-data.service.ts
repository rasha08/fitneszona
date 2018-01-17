import { Injectable } from '@angular/core';

import { UserHTTPService } from './user-http.service';
import { AuthService } from './auth.service';
import * as isEmpty from 'lodash/isEmpty';

@Injectable()
export class UserDataService {
  private _user;
  public userLoggedIn: any = false;

  constructor(
    private _userHttpService: UserHTTPService,
    private _authService: AuthService
  ) {
    this._authService.authStatusChange$.subscribe(status => {
      this.userLoggedIn = status;
      this._user = this._getUser();
    });

    this._authService.userDataChange$.subscribe(() => {
      this._user = this._getUser();
    });
  }

  public likeTag(tag, id) {
    const body = {
      action: 'addLikedTag',
      value: tag
    };

    this._userHttpService.action(body, id);
  }

  public addTextToVisited(textId, id) {
    const body = {
      action: 'addTextToVisited',
      textId: textId
    };

    this._userHttpService.action(body, id);
  }

  private _getUser() {
    return this._authService.getUser();
  }

  public getUser() {
    return this._user;
  }

  public getUserLikedTags() {}

  public getUserLikedCategories() {}

  public getUserVisitedCategories() {}

  public getUserVisitedTextsIds() {
    return this._user.visited_text_id ? this._user.visited_text_id : [];
  }

  public getUserFavoriteTags() {
    return this._user.favorite_tags && this._user.favorite_tags[0]
      ? this._user.favorite_tags
      : [];
  }

  public getUserNotifications() {
    return this._user.notifications && this._user.notifications !== [] ? this._user.notifications : [];
  }

  public predictTextsThatUserMightLike() {
  }

  public getUserConfiguration() {
    if (this._user !== undefined) {
      return this._user.configuration;
    }else {
      return false;
    }
  }
}
