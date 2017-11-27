import { Component, Input } from '@angular/core';

@Component({
  selector: 'category-item-details-component',
  templateUrl: './category-item-details.html'
})
export class CategoryItemDetailsComponent {
  @Input() public text;

  public getTextUrl(text) {
    return `/tekstovi/${text.categoryUrlSlug}/${text.article_title_url_slug}`;
  }
}
