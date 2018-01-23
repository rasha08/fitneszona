import { Component, OnInit } from '@angular/core';

import { AppAnimationService } from '../services/app.animation.service';
@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public isOpen = false;

  constructor(private _appAnimationService: AppAnimationService) {}

  public ngOnInit() {
    this._subscribeToCloseMenusEvent();
  }

  private _subscribeToCloseMenusEvent() {
    this._appAnimationService.closeMenus$.subscribe(() => {
      this.isOpen = false;
    });
  }

  public toggleNavigation() {
    this.isOpen = !this.isOpen;
  }
}
