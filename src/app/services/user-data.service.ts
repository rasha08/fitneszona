import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth.service';

Injectable()
export class UserDataService {
  private _user;
  constructor(
    private _authService: AuthService
  ) {
    this._authService.authStatusChange$.subscribe((change) => {
      this._user = this._authService.getUser();
    });
  }

  public getUserLikedTags() {
    return this._user.liked_tags.split('|');
  }

  public getUserLikedCategories() {
    return this._user.liked_categories.split('|');
  }

  public getUserVisitedCategories() {
    return this._user.visited_categories.split('|');
  }

  public getUserVisitedTags() {
    return this._user.visited_tags.split('|');
  }

  public getUserVisitedTextsIds() {
    return this._user.visited_text_ids.split('|');
  }

  public predictTextsThatUserMightLike() {
  }
  
}
