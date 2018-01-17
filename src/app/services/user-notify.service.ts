import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserNotifyService{
    private BASE_URL = 'https://fitneszona.rs';
    constructor(
        private _http: Http
    ) {}

    public clearNotification(notificationId) {
        const url = this.BASE_URL + `/api/notification/${notificationId}/seen-notification`;
        this._http.get(url)
          .subscribe(
            response => console.log('Notification response:', response.text()),
            error => console.log('Notificition error:', error)
          )
      }
}