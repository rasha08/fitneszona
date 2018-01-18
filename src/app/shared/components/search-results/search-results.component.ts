import { Component, Input, AfterContentChecked } from '@angular/core';

import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.html'
})
export class SearchResultsComponent implements AfterContentChecked {
  @Input() data: any;

  public title = '';
  public results = false;
  public message = true;

  constructor(private _modalService: ModalService) {}

  ngAfterContentChecked() {
    this.title = this.data.title;
    if (Array.isArray(this.data.results)) {
      this.results = true;
      this.message = false;
    }
  }

  public close() {
    this._modalService.closeModal();
  }
}
