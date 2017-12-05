import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  public formatStringForUrl(string) {
    return string.trim().replace(/s+/g, '-');
  }

  public getFormatedDateWithTimeZoneOffset() {
    const currentDate = new Date();
    let hour;
    const winterTimeOffsetStart = new Date(
      `${currentDate.getFullYear()}-10-29 23:00:00`
    );
    const summerTimeOffsetStart = new Date(
      `${currentDate.getFullYear()}-03-29 23:00:00`
    );

    if (
      currentDate < winterTimeOffsetStart &&
      currentDate > summerTimeOffsetStart
    ) {
      hour = currentDate.getHours() - 2;
    } else {
      hour = currentDate.getHours() - 1;
    }

    return `${currentDate.getFullYear()}-${currentDate.getMonth() +
      1}-${currentDate.getDate()} ${
      hour
    }:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  }

  public getArticleUrl(category, article) {
    return `/tekstovi/${category.urlSlug}/${article.article_title_url_slug}`;
  }

  public formatStringForSearch(string) {
    return string.toLowerCase()
      .replace(/š/g, 's')
      .replace(/č/g, 'c')
      .replace(/ć/g, 'c')
      .replace(/ž/g, 'z')
      .replace(/đ/g, 'dj');
  }

}
