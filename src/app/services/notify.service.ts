import { Injectable } from '@angular/core';
import { database } from 'firebase';

@Injectable()
export class NotifyService {
  public subscribeToConfigurationChanges(id) {
    return database().ref(`/configurationsfb/${id}`);
  }
}
