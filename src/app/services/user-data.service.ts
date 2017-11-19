import { Injectable } from '@angular/core';

import { UserHTTPService } from './user-http.service';

@Injectable()
export class UserDataService {
  constructor(private _userHttpService: UserHTTPService) {}

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

  public getUserLikedTags() {}

  public getUserLikedCategories() {}

  public getUserVisitedCategories() {}

  public getUserVisitedTags() {}

  public getUserVisitedTextsIds() {}

  public predictTextsThatUserMightLike() {}
}
