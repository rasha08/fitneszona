import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotificationsComponent } from './notifications.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent],
  providers: []
})
export class NotificationsModule {}
