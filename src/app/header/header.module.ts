import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header.component";
import { SearchComponent } from "./search/search.component";
import { TopNavigationComponent } from "./top-navigation/top-navigation.component";
import { BottomNavigationComponent } from "./bottom-navigation/bottom-navigation.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    HeaderComponent,
    SearchComponent,
    TopNavigationComponent,
    BottomNavigationComponent
  ],
  exports: [HeaderComponent],
  providers: []
})
export class HeaderModule {}
