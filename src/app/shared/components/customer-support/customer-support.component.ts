import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BottomMenuService } from '../../modules/bottom-menu/services/bottom-menu.service';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.html'
})
export class CustomerSupportComponent {
  public isCustomerSupportOpen = false;
  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _bottomMenuService: BottomMenuService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._listenForCustomerSupportStatusChange();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _listenForCustomerSupportStatusChange() {
    this._subscriptions.push(
      this._bottomMenuService.customerSupportStatusChanges$.subscribe(
        (isOpen: boolean) => {
          this.isCustomerSupportOpen = isOpen;
          this._changeDetectorRef.detectChanges();
        }
      )
    );
  }

  public toggleCustomerSuport() {
    this._bottomMenuService.toggleCustomerSupportStatus();
  }
}
