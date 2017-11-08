import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NotifyService } from './notify.service';

import { ConfigurationHTTPService } from './configuration-http.service';

@Injectable()
export class ConfigurationService {
  public BASE_URL: string = 'http://fitneszona.rs';
  public configuration: object;
  private _updateCouner = 0;

  private _openConfiguration = new Subject();
  public configurationStatusChange$ = this._openConfiguration.asObservable();

  constructor(
    private _configurationHTTPService: ConfigurationHTTPService,
    private _notifyService: NotifyService
  ) {
    this._subscribeToConfigurationChanges();
  }

  public getConfiguration() {
    this._configurationHTTPService.getConfiguration().subscribe(
      configuration => {
        this.configuration = configuration;
        this._sendNotification(true);
      },
      error => console.log(error)
    );
  }

  public getParam(param) {
    return this.configuration[param];
  }

  private _sendNotification(value) {
    this._openConfiguration.next(value);
  }

  private _subscribeToConfigurationChanges() {
    this._notifyService
      .subscribeToConfigurationChanges(1)
      /*.on('value', update => {
        this._updateCouner += 1;
        if (this._shouldFetchNewConfiguration()) {
          this.getConfiguration();
        }
      });*/
  }

  private _shouldFetchNewConfiguration() {
    return this._updateCouner > 1;
  }
}
