import { Component } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public isOpen = false;

  public toggleNavigation() {
    this.isOpen = !this.isOpen;
  }
}
