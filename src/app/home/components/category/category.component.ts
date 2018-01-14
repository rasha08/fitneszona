import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';

import { ArticlesService } from '../../../services/articles.service';
import { NotifyService } from '../../../services/notify.service';
import { LoaderService } from '../../../services/loader.service';
import { UtilsService } from '../../../services/utils.service';
import { ConfigurationService } from '../../../services/configuration.service';

import { SpecificCategoriesComponent } from '../specific-categories/specific-categories.component';

declare const $;

@Component({
  selector: 'category',
  templateUrl: './category.html'
})
export class CategoryComponent extends SpecificCategoriesComponent
  implements OnInit, OnDestroy {
  constructor(
    _articlesService: ArticlesService,
    _notifyService: NotifyService,
    _changeDetectorRef: ChangeDetectorRef,
    _loaderService: LoaderService,
    _utilsService: UtilsService,
    _configurationService: ConfigurationService,
    _router: Router
  ) {
    super(
      _articlesService,
      _notifyService,
      _changeDetectorRef,
      _loaderService,
      _utilsService,
      _configurationService,
      _router
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected _organizeArticles() {
    this._activeCategories = this._configurationService.getParam(
      'active_categories'
    );
    this.articles = this._allArticles.filter(
      article =>
        this._activeCategories.findIndex(
          activeCategory => activeCategory.category === article.category
        ) !== -1
    );

    this.articles['main'] = this.articles[0];
    this.articles['featured'] = this.articles.slice(1, 4);
    this.articles['articles'] = this.articles.splice(4);
  }
}
