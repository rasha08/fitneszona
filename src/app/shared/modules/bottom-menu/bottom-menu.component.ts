import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BottomMenuService } from './services/bottom-menu.service';

declare const $: any;

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.html'
})
export class BottomMenuComponent implements OnInit, OnDestroy, AfterViewInit {
  public isBottomMenuOpen = false;
  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _bottomMenuService: BottomMenuService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._listenForBottomMenuStatusChange();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngAfterViewInit() {
    $('select').material_select();
  }

  private _listenForBottomMenuStatusChange() {
    this._subscriptions.push(
      this._bottomMenuService.bottomMenuStatusChanges$.subscribe(
        (isOpen: boolean) => {
          this.isBottomMenuOpen = isOpen;
          this._changeDetectorRef.detectChanges();
        }
      )
    );
  }

  public toggleBotomMenu() {
    this._bottomMenuService.toggleBottomMenuStatus();
  }
}
