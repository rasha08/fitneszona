import { Component } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.html'
})
export class RightSidebarComponent {
  public isSidebarOpen = false;
  public isRecomendedTabActive = true;
  public activeTab = 'recomended';

  public toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public activateTab(tab) {
    this.activeTab = tab;
    this.isRecomendedTabActive = tab === 'recomended' ? true : false;
  }
}
