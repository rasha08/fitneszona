import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LeftSidebarComponent } from "./left-sidebar.component";
import { CategoryListComponent } from "./components/category-list/category-list.component";
import { CategoryItemsComponent } from "./components/category-list/components/category-items/category-items.component";
import { CategoryItemDetailsComponent } from "./components/category-list/components/category-items/components/category-item-details/category-item-details.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    LeftSidebarComponent,
    CategoryListComponent,
    CategoryItemsComponent,
    CategoryItemDetailsComponent
  ],
  exports: [LeftSidebarComponent],
  providers: []
})
export class LeftSidebarModule {}
