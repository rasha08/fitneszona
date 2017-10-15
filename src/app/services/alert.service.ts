import { Injectable, NgZone } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { ModalService } from "./modal.service";

import { AlertComponent } from "../shared/components/alert/alert";

@Injectable()
export class AlertService {
  constructor(private _modalService: ModalService, private _ngZone: NgZone) {}

  public openAlert(data) {
    console.log(data);
    this._modalService.closeModal();
    this._ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this._modalService.openModal({
          component: AlertComponent,
          data: data
        });
      }, 50);
    });
  }
}
