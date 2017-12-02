import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BottomMenuComponent } from './bottom-menu.component';

import { BottomMenuService } from './services/bottom-menu.service';

@NgModule({
  imports: [CommonModule],
  declarations: [BottomMenuComponent],
  exports: [BottomMenuComponent],
  providers: [BottomMenuService]
})
export class BottomMenuModule {}
