import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

//Services
import { ConfigurationService } from '../../services/configuration.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ArticlesCounterService } from '../../services/articles-counter.service';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.html'
})
export class BottomNavigationComponent implements OnInit, OnDestroy {
  public error;
  public activeCategories;
  public categoriesWithNewArticles;
  public headerData;
  private _countedCategories;

  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _configurationService: ConfigurationService,
    private _localStorageService: LocalStorageService,
    private _articleCounterService: ArticlesCounterService,
    private _utilsService: UtilsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.subscribeToConfiguration();
    this.subscribeToCategoriesWithNewArticles();
    this.subscribeToUserStatusChange();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getHeaderData() {
    const timestring = this._utilsService.getFormatedDateWithTimeZoneOffset();
    this._ngZone.runOutsideAngular(() =>
      setTimeout(
        () =>
          this._articleCounterService.getCategoriesWithNewArticles(timestring),
        1500
      )
    );
  }
  subscribeToConfiguration() {
    this._subscriptions.push(
      this._configurationService.configurationStatusChange$.subscribe(
        notification => {
          this.activeCategories = this._configurationService.getParam(
            'active_categories'
          );
          this._changeDetectorRef.detectChanges();
        },
        error => {}
      )
    );
  }

  subscribeToCategoriesWithNewArticles() {
    this._subscriptions.push(
      this._articleCounterService.sendCategoriesToBottomHeader$.subscribe(
        countedCategories => {
          this._countedCategories = countedCategories;
          this.setCategoriesWithNewArticles();
        },
        error => {}
      )
    );
  }

  subscribeToUserStatusChange() {
    this._subscriptions.push(
      this._authService.authStatusChange$.subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.getHeaderData();
        }
      })
    );
  }

  public setCategoriesWithNewArticles() {
    if (!this._countedCategories || !this.activeCategories) {
      return;
    }

    this._countedCategories.map(category => {
      const categoryIndex = this.activeCategories.findIndex(
        activeCategory =>
          activeCategory.name.toLowerCase() === category.categoryName
      );
      if (categoryIndex > -1) {
        this.activeCategories[categoryIndex]['count'] = category.count;
      }
    });
  }
}
