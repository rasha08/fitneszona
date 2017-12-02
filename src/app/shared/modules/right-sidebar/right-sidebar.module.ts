import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RightSidebarComponent } from './right-sidebar.component';
import { UserHistoryTabComponent } from './components/user-history-tab/user-history-tab.component';
import { UserRecomendedTabComponent } from './components/user-recomended-tab/user-recomended-tab.component';

import { RightSidebarTabsService } from './services/right-sidebar-tabs.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    RightSidebarComponent,
    UserHistoryTabComponent,
    UserRecomendedTabComponent
  ],
  exports: [RightSidebarComponent],
  providers: [RightSidebarTabsService]
})
export class RightSidebarModule {}
