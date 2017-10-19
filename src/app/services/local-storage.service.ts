import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
  constructor() {
    this.setItem("lastVisit", JSON.stringify(new Date()));
  }

  public setItem(key, value) {
    localStorage.setItem(key, value);
  }

  public getKeyIfExists(key) {
    return localStorage.getItem(key) ? localStorage.getItem(key) : null;
  }

  public setUserLastVist() {
    localStorage.setItem("userLastVisit", JSON.stringify(new Date()));
  }

  public getUserLastVisit() {
    return this.getKeyIfExists("userLastVisit");
  }

  public getLastVisitFromBowser() {
    return this.getKeyIfExists("lastVisit");
  }
}
