import { Injectable } from '@angular/core';

import { UserHTTPService } from './user-http.service';
import { AuthService } from './auth.service';

@Injectable()
export class UserDataService {
  _user;

  constructor(
    private _userHttpService: UserHTTPService,
    private _authService: AuthService
  ) {
    this._authService.authStatusChange$.subscribe(
      _ => {console.log('Runned');this._user = this._getUser();}
    )
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

  private _getUser(){
    return this._authService.getUser();
  }

  public getUser(){
    return this._user;
  }

  public getUserLikedTags() {}

  public getUserLikedCategories() {}

  public getUserVisitedCategories() {}

  public getUserVisitedTags() {}

  public getUserVisitedTextsIds() {}

  public predictTextsThatUserMightLike() {}
}
