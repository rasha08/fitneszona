import { Injectable } from '@angular/core';


@Injectable()
export class UtilsService {
  public formatStringForUrl(string) {
    return string.trim().replace(/s+/g, '-');
  }

  public getArticleUrl(article) {
    const articleTitleUrlSlug = this.formatStringForUrl(article.titile);

    return `/${article.category}/${articleTitleUrlSlug}`;
  }
}
