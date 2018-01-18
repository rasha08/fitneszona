import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NotificationsComponent } from './notifications.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent],
  providers: []
})
export class NotificationsModule {}
