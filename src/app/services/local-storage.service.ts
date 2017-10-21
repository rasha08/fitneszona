import { Injectable } from "@angular/core";

import { UtilsService } from './utils.service';

@Injectable()
export class LocalStorageService {
  constructor(
    private _utilsService: UtilsService
  ) {
    this.setItem("lastVisit", this._utilsService.getFormatedDateWithTimeZoneOffset());
  }

  public setItem(key, value) {
    localStorage.setItem(key, value);
  }

  public getKeyIfExists(key) {
    return localStorage.getItem(key) ? localStorage.getItem(key) : null;
  }

  public setUserLastVist() {
    localStorage.setItem("userLastVisit", this._utilsService.getFormatedDateWithTimeZoneOffset());
  }

  public getUserLastVisit() {
    return this.getKeyIfExists("userLastVisit");
  }

  public getLastVisitFromBrowser() {
    return this.getKeyIfExists("lastVisit");
  }
}
