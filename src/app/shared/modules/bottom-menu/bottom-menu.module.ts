import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BottomMenuComponent } from './bottom-menu.component';

import { BottomMenuService } from './services/bottom-menu.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [BottomMenuComponent],
  exports: [BottomMenuComponent],
  providers: [BottomMenuService]
})

export class BottomMenuModule {}
