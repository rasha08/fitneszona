import { Injectable } from "@angular/core";

import { UtilsService } from './utils.service';

@Injectable()
export class LocalStorageService {
  private _user;

  constructor(
    private _utilsService: UtilsService,
  ) {
    this.setItem("lastVisit", this._utilsService.getFormatedDateWithTimeZoneOffset());
  }

  public setItem(key, value) {
    localStorage.setItem(key, value);
  }

  public getKeyIfExists(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
  }

  public setUserLastVist(user) {
    const userLastVisits: Array<any> = this.getKeyIfExists('usersLastVisit');
    let userLastVisitsArray = userLastVisits ? userLastVisits : [];

    if (!this.getUserLastVisit(user.id)) {
      console.log('No USER ID');
        userLastVisitsArray.push({
        id: user.id,
        visit: this._utilsService.getFormatedDateWithTimeZoneOffset()
      });
    } else {
      console.log('USER ID');
      userLastVisitsArray = userLastVisitsArray.map((userLastVisit) => {
        if (userLastVisit.id === user.id ) {
          userLastVisit.visit = this._utilsService.getFormatedDateWithTimeZoneOffset();
        }

        return userLastVisit;
      });
    }

    this.setItem("usersLastVisit", JSON.stringify(userLastVisitsArray));
  }

  public getUserLastVisit(id) {
    const usersLastVisit = this.getKeyIfExists("usersLastVisit");
    const userLastVisit = usersLastVisit ? usersLastVisit.filter(user => user.id = id).pop() : null;

    return userLastVisit ? userLastVisit.visit : null;
  }

  public getLastVisitFromBrowser() {
    return this.getKeyIfExists("lastVisit");
  }

  public setLastVisitFromBrowser() {
    this.setItem("lastVisit", this._utilsService.getFormatedDateWithTimeZoneOffset());
  }
}
