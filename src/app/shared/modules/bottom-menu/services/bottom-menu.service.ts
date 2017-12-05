import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';

import { UserHTTPService } from '../../../../services/user-http.service';

declare const $: any;

@Injectable()
export class BottomMenuService {
  private _isBottomMenuOpen = false;
  private _isCustomerSupportOpen = false;

  private _bottomMenuStatusChange = new ReplaySubject();
  public bottomMenuStatusChanges$ = this._bottomMenuStatusChange.asObservable();

  private _customerSupportStatusChange = new ReplaySubject();
  public customerSupportStatusChanges$ = this._customerSupportStatusChange.asObservable();

  constructor(
    private _userHTTPService: UserHTTPService
  ){}

  public toggleBottomMenuStatus() {
    this._isBottomMenuOpen = !this._isBottomMenuOpen;
    this._bottomMenuStatusChange.next(this._isBottomMenuOpen);
  }

  public toggleCustomerSupportStatus() {
    this._isCustomerSupportOpen = !this._isCustomerSupportOpen;
    if (this._isCustomerSupportOpen) {
      $('.application').addClass('disabled');
    } else {
      $('.application').removeClass('disabled');
    }
    this._customerSupportStatusChange.next(this._isCustomerSupportOpen);
  }

  public setUserConfiguration(configuration, id) {
    this._userHTTPService.setUserConfiguration(configuration, id)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      )
  }
}
