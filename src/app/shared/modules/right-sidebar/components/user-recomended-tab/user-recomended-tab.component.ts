import { Component, Input } from '@angular/core';

import { ArticlesService } from '../../../../../services/articles.service';

@Component({
  selector: 'app-user-recomended-tab',
  templateUrl: './user-recomended-tab.html'
})
export class UserRecomendedTabComponent {
  @Input() articles;

  constructor(
    private _articleService: ArticlesService
  ) { }

  public openArticle(categoryUrlSlug, article_title_url_slug) {
    return `/tekstovi/${categoryUrlSlug}/${article_title_url_slug}`;
  }
}
