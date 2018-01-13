import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-recomended-tab',
  templateUrl: './user-recomended-tab.html'
})
export class UserRecomendedTabComponent {
  @Input() articles;

  public openArticle(categoryUrlSlug, article_title_url_slug) {
    return `/tekstovi/${categoryUrlSlug}/${article_title_url_slug}`;
  }
}
