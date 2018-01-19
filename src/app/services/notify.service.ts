import { Injectable } from '@angular/core';
import { database } from 'firebase';

@Injectable()
export class NotifyService {
  public subscribeToConfigurationChanges(id) {
    return database().ref(`/configurationsfb/${id}`);
  }

  public subscribeToArticleChanges(id) {
    return database().ref(`/articlesfb/${id}/update`);
  }

  public subscribeToUserChanges(id) {
    return database().ref(`/usersfb/${id}/update`);
  }

  public subscribeToUserConfigurationChanges(id) {
    return database().ref(`/userconfigurationfb/${id}/update`);
  }

  public subscribeToAllArticlesChanges(id) {
    return database().ref(`/all_articles_fb/${id}`);
  }
}
