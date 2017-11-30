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

  constructor(private _modalService: ModalService) {}

  ngAfterContentChecked() {
    this.title = this.data.title;
    if (Array.isArray(this.data.results)){
      this.results = true;
    }
  }

  public close() {
    this._modalService.closeModal();
  }

  public getArticleUrl(text) {
    return `/tekstovi/${text.categoryUrlSlug}/${text.article_title_url_slug}`;
  }
}