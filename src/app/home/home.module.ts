import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LeftSidebarModule } from "../shared/modules/left-sidebar/left-sidebar.module";

import { HomeComponent } from "./home.component";

@NgModule({
  imports: [CommonModule, LeftSidebarModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule {}
