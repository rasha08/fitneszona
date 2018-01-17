import { Injectable } from '@angular/core';
import { database } from 'firebase';
import { Http } from '@angular/http';

@Injectable()
export class NotifyService {
  private BASE_URL = 'https://fitneszona.rs';
  constructor(
    private _http: Http
  ) {}
  public subscribeToConfigurationChanges(id) {
    return database().ref(`/configurationsfb/${id}`);
  }

  public subscribeToArticleChanges(id) {
    return database().ref(`/articlesfb/${id}/update`);
  }

  public subscribeToUserChanges(id) {
    return database().ref(`/usersfb/${id}/update`);
  }

  public subscribeToAllArticlesChanges(id) {
    return database().ref(`/all_articles_fb/${id}`);
  }
}
