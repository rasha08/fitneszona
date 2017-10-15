import { Component, Input, AfterContentChecked } from "@angular/core";

import { ModalService } from "../../../services/modal.service";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.html"
})
export class AlertComponent implements AfterContentChecked {
  @Input() data: any;

  public message = "";
  public title = "";
  public type = "";

  constructor(private _modalService: ModalService) {}

  ngAfterContentChecked() {
    this.message = this.data.message.body;
    this.title = this.data.message.title;
    this.type = this.data.message.type;
  }

  public close() {
    this._modalService.closeModal();
  }
}
