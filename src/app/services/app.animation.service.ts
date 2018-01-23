import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppAnimationService {
  public openMenus = [];

  private _closeMenus = new Subject();
  public closeMenus$ = this._closeMenus.asObservable();

  private _toggleRightSideBar = new Subject();
  public toggleRightSideBar$ = this._toggleRightSideBar.asObservable();

  private _toggleLeftSideBar = new Subject();
  public toggleLeftSideBar$ = this._toggleLeftSideBar.asObservable();

  public closeMenuBars() {
    this._closeMenus.next();
  }

  public toggleRightSideBar() {
    this._toggleRightSideBar.next();
  }

  public toggleLeftSideBar() {
    this._toggleLeftSideBar.next();
  }
}
