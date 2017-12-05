import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from "./header.component";
import { SearchComponent } from "./search/search.component";
import { TopNavigationComponent } from "./top-navigation/top-navigation.component";
import { BottomNavigationComponent } from "./bottom-navigation/bottom-navigation.component";

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
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
