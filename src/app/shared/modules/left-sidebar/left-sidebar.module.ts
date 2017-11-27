import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LeftSidebarComponent } from './left-sidebar.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryItemsComponent } from './components/category-list/components/category-items/category-items.component';
import { CategoryItemDetailsComponent } from './components/category-list/components/category-items/components/category-item-details/category-item-details.component';
import { ReplacmentListComponent } from './components/replacment-list/replacment-list.component';

import { ReplacmentListService } from './services/replacment-list.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    LeftSidebarComponent,
    CategoryListComponent,
    CategoryItemsComponent,
    CategoryItemDetailsComponent,
    ReplacmentListComponent
  ],
  exports: [LeftSidebarComponent],
  providers: [ReplacmentListService]
})
export class LeftSidebarModule {}
