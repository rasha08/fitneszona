import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class BottomMenuService {
  private _isBottomMenuOpen = false;

  private _bottomMenuStatusChange = new ReplaySubject();
  public bottomMenuStatusChanges$ = this._bottomMenuStatusChange.asObservable();

  public toggleBottomMenuStatus() {
    this._isBottomMenuOpen = !this._isBottomMenuOpen;
    this._bottomMenuStatusChange.next(this._isBottomMenuOpen);
  }
}
