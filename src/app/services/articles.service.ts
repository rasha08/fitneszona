import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ConfigurationService } from './configuration.service';
import { ArticlesHTTPService } from './atricles-http.service';
import { UtilsService } from './utils.service';
import { VisitedArticlesService } from './visited-articles.service';
import { NotifyService } from './notify.service';
import { SeoRulesService } from './seo-rules.service';

@Injectable()
export class ArticlesService {
  public allArticles;
  public allArticlesWithText;
  public topArticles = [];
  public latestArticles = [];
  public indexArticles = [];
  public allArticlesFetched = false;
  public articlesAutocompleteEnitities = [];
  public openPage;

  private _allArticlesFetched = new Subject();
  public allArticlesStateChange$ = this._allArticlesFetched.asObservable();

  private _allArticlesWithTextFetched = new Subject();
  public allArticlesWithTextStateChange$ = this._allArticlesWithTextFetched.asObservable();

  private _singleArticleFetched = new Subject();
  public fetchedSingleArticle$ = this._singleArticleFetched.asObservable();

  private _searchAutoCompleteEntitiesReady = new Subject();
  public searchAutoCompleteEntitiesReady$ = this._searchAutoCompleteEntitiesReady.asObservable();

  private _likeResponseStatus = new Subject();
  public likeResponseStatus$ = this._likeResponseStatus.asObservable();

  private _dislikeResponseStatus = new Subject();
  public dislikeResponseStatus$ = this._dislikeResponseStatus.asObservable();

  private _sholudResortTags = new Subject();
  public sholudResortTags$ = this._sholudResortTags.asObservable();

  constructor(
    private _articlesHTTPService: ArticlesHTTPService,
    private _configurationService: ConfigurationService,
    private _ngZone: NgZone,
    private _utilsService: UtilsService,
    private _visitedArticlesService: VisitedArticlesService,
    private _notifyService: NotifyService,
    private _seoRulesService: SeoRulesService
  ) {
      this._configurationService.configurationStatusChange$.subscribe(() => {
      if (!this.allArticles) {
        this._ngZone.runOutsideAngular(() => this.getAllArticles());
      }
    });
  }

  public getArticle(id) {
    if (this.allArticles) {
      this._seoRulesService.setSeoTagsForArticle(
        this.allArticles.find(article => article.article_title_url_slug === id)
      );
    }
    return this._articlesHTTPService.getArticle(id).subscribe(
      article => {
        this._seoRulesService.setSeoTagsForArticle(article);
        this.singleArticleFetched(article);
        this._visitedArticlesService.addArticleToVisited(article.id);
        this._sholudResortTags.next();
      },
      error => setTimeout(this.getArticle(id), 1000)
    );
  }

  public getAllArticles() {
    this._articlesHTTPService.getAllArticles().subscribe(
      response => {
        this.allArticles = response.articles;
        this.topArticles = response.topArticles;
        this.latestArticles = response.latestArticles;
        this.indexArticles = response.indexPageArticles;
        this.allArticlesStateChange(true);
        this.formatArticlesForAutoComplete();
        this.allArticlesFetched = true;
        this.subscribeToAllArticlesChanges();
      },
      error => {}
    );
  }

  public getAllArticlesWithText() {
    this._articlesHTTPService.getAllArticlesWithText().subscribe(articles => {
      this.allArticlesWithText = articles.map(article => {
        const articleShortMarket = this.allArticles.find(
          singleArticle => singleArticle.id === article.id
        );

        return {
          id: article.id,
          text: article.text,
          title: articleShortMarket.title,
          imageUrl: articleShortMarket.thumb_image_url,
          tags: articleShortMarket.tags,
          link: `/tekstovi/${articleShortMarket.categoryUrlSlug}/${
            articleShortMarket.article_title_url_slug
          }`
        };
      });
      this._allArticlesWithTextFetched.next(true);
    });
  }

  public subscribeToAllArticlesChanges() {
    this._notifyService.subscribeToAllArticlesChanges(1).on('value', update => {
      const updateObject = update.val();
      this.indexArticles = JSON.parse(updateObject.index);
      this.latestArticles = JSON.parse(updateObject.latest);
      this.topArticles = JSON.parse(updateObject.top);
    });
  }

  public getTopArticles() {
    return this._articlesHTTPService.getTopArticles();
  }

  public getLatestArticles() {
    return this._articlesHTTPService.getLatestArticles();
  }

  public getArticlesForPage() {
    let articles;
    switch (this.openPage) {
      case 'top':
        articles = this.allArticles
          .filter(
            article =>
              this.topArticles.indexOf(article.id) > -1 &&
              this._visitedArticlesService.getArticles().indexOf(article.id) ===
                -1
          )
          .slice(0, 15);
        this._seoRulesService.setSeoTagsForPage('top', articles);

        return articles;

      case 'latest':
        articles = this.allArticles
          .filter(
            article =>
              this.latestArticles.indexOf(article.id) > -1 &&
              this._visitedArticlesService.getArticles().indexOf(article.id) ===
                -1
          )
          .slice(0, 15);
        this._seoRulesService.setSeoTagsForPage('latest', articles);

        return articles;

      case 'index':
        articles = this.allArticles
          .filter(
            article =>
              this.indexArticles.indexOf(article.id) > -1 &&
              this._visitedArticlesService.getArticles().indexOf(article.id) ===
                -1
          )
          .slice(0, 16);
        this._seoRulesService.setSeoTagsForPage('index', articles);

        return articles;

      default:
        articles = this._formatCategoryArticles(
          this.allArticles.filter(article => article.category === this.openPage)
        );
        this._seoRulesService.setSeoTagsForPage(this.openPage, articles);

        return articles;
    }
  }

  public mutateOpenPageState(page) {
    this.openPage = page;
  }

  private _formatCategoryArticles(articles) {
    const visitedArticles = [];
    const categoryArticles = [];
    const visitedArticlesMarkets = this._visitedArticlesService.getArticles();
    articles.map(article => {
      if (article && visitedArticlesMarkets.indexOf(article.id) === -1) {
        categoryArticles.push(article);
      } else if (article) {
        visitedArticles.push(article);
      }
    });

    return categoryArticles.concat(visitedArticles);
  }

  private allArticlesStateChange(param) {
    this._allArticlesFetched.next(param);
  }

  public getArticlesByTagName(tag, limit = 200) {
    if (!this.allArticles || !this.allArticles.length) {
      return [];
    }

    const visitedArticles = [];
    const visitedArticlesMarkets = this._visitedArticlesService.getArticles();
    let numOfArticlesReturned = 0;
    return this.allArticles.filter(article => {
      if (
        article.tags.indexOf(tag) !== -1 &&
        numOfArticlesReturned < limit &&
        visitedArticlesMarkets.indexOf(article.id) === -1
      ) {
        numOfArticlesReturned += 1;

        return true;
      }

      return false;
    });
  }

  public orderByTimeOfUpdate(articles = []) {
    return articles.sort(
      (a, b) =>
        -(new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime())
    );
  }

  public singleArticleFetched(article) {
    this._singleArticleFetched.next(article);
  }

  public like(textId, userId) {
    const data = {
      action: 'like',
      userId: userId
    };

    this._articlesHTTPService
      .action(data, textId)
      .subscribe(
        response => this._likeResponseStatus.next(response),
        error => {}
      );
  }

  public disLike(textId, userId) {
    const data = {
      action: 'dislike',
      userId: userId
    };

    this._articlesHTTPService
      .action(data, textId)
      .subscribe(
        reponse => this._dislikeResponseStatus.next(reponse),
        error => {}
      );
  }

  public comment(textId, userId, comment) {
    const data = {
      action: 'comment',
      userId,
      comment
    };

    this._articlesHTTPService.action(data, textId).subscribe(response => {});
  }

  public formatArticlesForAutoComplete() {
    this.articlesAutocompleteEnitities = this.allArticles.map(article => {
      return {
        title: article.title,
        link: `/tekstovi/${article.categoryUrlSlug}/${
          article.article_title_url_slug
        }`,
        titleSearchString: this._utilsService.formatStringForSearch(
          article.title
        )
      };
    });

    this._searchAutoCompleteEntitiesReady.next(
      this.articlesAutocompleteEnitities
    );
  }

  public getArticlesMarketsForHistory() {
    const visitedArticlesMarkets = this._visitedArticlesService.getArticles();
    const visitedArticles = [];
    const articles = this.allArticles ? this.allArticles : [];
    articles.map(article => {
      if (visitedArticlesMarkets.indexOf(article.id) > -1) {
        visitedArticles.push({
          title: article.title,
          link: `/tekstovi/${article.categoryUrlSlug}/${
            article.article_title_url_slug
          }`
        });
      }
    });

    return visitedArticles;
  }

  public getArticlesForRightSidebar() {
    if (!this.allArticles || !this.allArticles.length) {
      return;
    }

    const articles = [];
    const articlesVisited = this._visitedArticlesService.getArticles();
    for (const article of this.allArticles) {
      if (articles.length < 20) {
        if (
          !(this.topArticles.indexOf(article.id) !== -1) &&
          !(this.indexArticles.indexOf(article.id) !== -1) &&
          !(this.latestArticles.indexOf(article.id) !== -1) &&
          !(articlesVisited.indexOf(article.id) !== -1)
        ) {
          articles.push(article);
        }
      } else {
        break;
      }
    }
    return articles;
  }

  public increeseArticleSeenTimes(id) {
    this._articlesHTTPService.increeseArticleSeenTimes(id);
  }
}
