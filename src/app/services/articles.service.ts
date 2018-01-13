import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ConfigurationService } from './configuration.service';
import { ArticlesHTTPService } from './atricles-http.service';
import { UtilsService } from './utils.service';
import { VisitedArticlesService } from './visited-articles.service';

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

  private _openArticle = new Subject();
  public openArticle$ = this._openArticle.asObservable();

  private _allArticlesFetched = new Subject();
  public allArticlesStateChange$ = this._allArticlesFetched.asObservable();

  private _allArticlesWithTextFetched = new Subject();
  public allArticlesWithTextStateChange$ = this._allArticlesWithTextFetched.asObservable();

  private _fetchedCategoryArticles = new Subject();
  public fetchedCategoryArticles$ = this._fetchedCategoryArticles.asObservable();

  private _fetchedIndexPageArticles = new Subject();
  public fetchedIndexPageArticles$ = this._fetchedIndexPageArticles.asObservable();

  private _specificCategoryArticlesFetched = new Subject();
  public specificCategoryArticlesFetched$ = this._specificCategoryArticlesFetched.asObservable();

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
    private _visitedArticlesService: VisitedArticlesService
  ) {
    this._configurationService.configurationStatusChange$.subscribe(() => {
      if (!this.allArticles) {
        this._ngZone.runOutsideAngular(() => this.getAllArticles());
      }
    });
  }

  public getArticle(id) {
    return this._articlesHTTPService.getArticle(id).subscribe(article => {
      this.singleArticleFetched(article);
      this._visitedArticlesService.addArticleToVisited(article.id);
      this._sholudResortTags.next();
    });
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
      },
      error => console.log('Error: ', error)
    );
  }

  public getAllArticlesWithText() {
    this._articlesHTTPService.getAllArticlesWithText().subscribe(articles => {
      this.allArticlesWithText = articles;
      this._allArticlesWithTextFetched.next(true);
    });
  }

  public getTopArticles() {
    return this._articlesHTTPService.getTopArticles();
  }

  public getLatestArticles() {
    return this._articlesHTTPService.getLatestArticles();
  }

  public getArticlesForPage() {
    console.log('OPEN PAGE', this.openPage);
    switch (this.openPage) {
      case 'top':
        return this.allArticles
          .filter(
            article =>
              this.topArticles.indexOf(article.id) > -1 &&
              this._visitedArticlesService.getArticles().indexOf(article.id) ===
                -1
          )
          .slice(0, 15);

      case 'latest':
        return this.allArticles
          .filter(
            article =>
              this.latestArticles.indexOf(article.id) > -1 &&
              this._visitedArticlesService.getArticles().indexOf(article.id) ===
                -1
          )
          .slice(0, 15);

      case 'index':
        return this.allArticles
          .filter(
            article =>
              this.indexArticles.indexOf(article.id) > -1 &&
              this._visitedArticlesService.getArticles().indexOf(article.id) ===
                -1
          )
          .slice(0, 11);

      default:
        return this._formatCategoryArticles(
          this.allArticles.filter(article => article.category === this.openPage)
        );
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

  public getTopArticlesForCategory(category) {
    this._articlesHTTPService
      .getTopArticlesForCategory(category)
      .subscribe(
        articles => this.openArticle(articles),
        error => console.log(error)
      );
  }

  public getLatestArticlesForCategory(category) {
    this._articlesHTTPService
      .getLatestArticlesForCategory(category)
      .subscribe(
        articles => this.openArticle(articles),
        error => console.log(error)
      );
  }

  public getArticleCategoryAndTags(id) {
    this._articlesHTTPService
      .getArticleCategoryAndTags(id)
      .subscribe(
        articles => this.openArticle(articles),
        error => console.log(error)
      );
  }

  public getArticleByURLSlug(article_title_url_slug) {
    this._articlesHTTPService
      .getArticleByURLSlug(article_title_url_slug)
      .subscribe(
        article => this.openArticle(article),
        error => console.log(error)
      );
  }

  private openArticle(article) {
    this._openArticle.next(article);
  }

  private allArticlesStateChange(param) {
    this._allArticlesFetched.next(param);
  }

  public getArticlesByTagName(tag, limit = 200) {
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

  public ariclesFetchedForCategory(articles) {
    this._fetchedCategoryArticles.next(articles);
  }

  public ariclesFetchedForIndexPage(articles) {
    this._fetchedIndexPageArticles.next(articles);
  }

  public articlesFetchedForSpecificCategory(articles) {
    this._specificCategoryArticlesFetched.next(articles);
  }

  public singleArticleFetched(article) {
    this._singleArticleFetched.next(article);
  }

  public inceraseSeanTimes(textId) {
    const data = {
      action: 'setSeenTimes'
    };

    this._articlesHTTPService.action(data, textId);
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
        error => console.log(error)
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
        error => console.log(error)
      );
  }

  public comment(textId, userId, comment) {
    const data = {
      action: 'comment',
      userId,
      comment
    };

    this._articlesHTTPService
      .action(data, textId)
      .subscribe(response => console.log(response));
  }

  public getIndexPageArticles() {
    return this._articlesHTTPService.getIndexPageArticles();
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

    this.allArticles.map(article => {
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
}
