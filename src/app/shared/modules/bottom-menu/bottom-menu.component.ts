import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BottomMenuService } from './services/bottom-menu.service';
import { AuthService } from '../../../services/auth.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { UserDataService } from '../../../services/user-data.service';

declare const $: any;

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.html'
})
export class BottomMenuComponent implements OnInit, OnDestroy, AfterViewInit {
  public isBottomMenuOpen = false;
  private _subscriptions: Array<Subscription> = [];
  public numberOfTextInLeftSidebar = null;
  public userChosenTheme = null;
  public userChosenTags = [];
  public userChosenCategories = [];
  public tags;
  public categories;
  public themes;

  constructor(
    private _bottomMenuService: BottomMenuService,
    private _authService: AuthService,
    private _configurationService: ConfigurationService,
    private _userDataService: UserDataService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._listenForBottomMenuStatusChange();
    this._subscribeToConfigurationFetchEvent();
    this._subscribeToUserLogInEvent();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _subscribeToConfigurationFetchEvent() {
    this._subscriptions.push(
      this._configurationService.configurationStatusChange$.subscribe(_ => {
        this.getAllCategories();
        this.getAllTags();
        this.getThemes();
        this._changeDetectorRef.detectChanges();
      })
    );
  }

  private _subscribeToUserLogInEvent() {
    this._subscriptions.push(
      this._authService.authStatusChange$.subscribe(status => {
        if (status) {
          this.setCurrentUserConfiguration();
          console.log(
            this.userChosenTheme,
            this.userChosenTags,
            this.userChosenCategories,
            this.numberOfTextInLeftSidebar
          );
        } else {
          this.resetConfiguration();
        }
      })
    );
  }

  ngAfterViewInit() {
    $('select').material_select();
  }

  private _listenForBottomMenuStatusChange() {
    this._subscriptions.push(
      this._bottomMenuService.bottomMenuStatusChanges$.subscribe(
        (isOpen: boolean) => {
          this.isBottomMenuOpen = isOpen;
          this._changeDetectorRef.detectChanges();
        }
      )
    );
  }

  public toggleBotomMenu() {
    this._bottomMenuService.toggleBottomMenuStatus();
  }

  public addOrRemoveUserCategories(category) {
    if (
      this.userChosenCategories.find(
        categoryInArray => category.name === categoryInArray.name
      ) === undefined
    ) {
      this.userChosenCategories.push(category);
    } else {
      const categoryIndex = this.userChosenCategories.findIndex(
        categoryInArray => categoryInArray.name === category.name
      );
      this.userChosenCategories.splice(categoryIndex, 1);
    }
  }

  public isCategorySelected(category) {
    return (
      this.userChosenCategories.find(
        categoryInArray => category.name === categoryInArray.name
      ) !== undefined
    );
  }

  public addOrRemoveUserTags(tag) {
    if (
      this.userChosenTags.find(tagInArray => tag === tagInArray) === undefined
    ) {
      this.userChosenTags.push(tag);
    } else {
      const tagIndex = this.userChosenTags.indexOf(tag);
      this.userChosenTags.splice(tagIndex, 1);
    }
  }

  public isTagSelected(tag) {
    return this.userChosenTags.indexOf(tag) > -1;
  }

  public setUserTheme(theme) {
    this.userChosenTheme = theme;
  }

  public isThemeSelected(theme) {
    return this.userChosenTheme === theme;
  }

  public setNumberOfTexts(number) {
    this.numberOfTextInLeftSidebar = number;
  }

  public isNumberOfTextInLeftSidebarSelected(number) {
    return this.numberOfTextInLeftSidebar === number;
  }

  public getUserId() {
    const user = this._authService.getUser();
    if (user === undefined) {
      return false;
    } else {
      return user['id'];
    }
  }

  public sendConfiguration() {
    const configuration = {
      thema: this.userChosenTheme,
      categoriesInNavigation:
        this.userChosenCategories !== []
          ? this.userChosenCategories.map(category => category.category)
          : null,
      numbersOfTextsInLeftSidebar: this.numberOfTextInLeftSidebar,
      notificationOfThemes:
        this.userChosenTags !== [] ? this.userChosenTags : null
    };
    const userId = this.getUserId();
    if (userId !== false) {
      this._bottomMenuService.setUserConfiguration(configuration, userId);
      console.log('Salje se na server');
    } else {
    }
  }

  public getAllCategories() {
    this.categories = this._configurationService.getParam('active_categories');
  }

  public getAllTags() {
    this.tags = this._configurationService.getParam('tags_priority_list');
  }

  public getThemes() {
    this.themes = this._configurationService.getParam('validThemeOptions');
  }

  public isTagInArray(tag) {
    return this.userChosenTags.indexOf(tag) !== -1 ? 'green' : 'red';
  }

  public isThemeChoosen(theme) {
    return this.userChosenTheme === theme ? 'green' : 'red';
  }

  public isCategoryInArray(category) {
    return this.userChosenCategories.findIndex(
      categoryInArray => categoryInArray.name === category.name
    ) !== -1
      ? 'green'
      : 'red';
  }

  public isNumberOfArticlesChoosen(value) {
    return this.numberOfTextInLeftSidebar === value ? 'green' : 'red';
  }

  public setCurrentUserConfiguration() {
    const userConfiguration = this._userDataService.getUserConfiguration();
    if (userConfiguration !== false) {
      if (userConfiguration.thema !== null) {
        this.userChosenTheme = userConfiguration.thema;
      }
      if (userConfiguration.categories_in_navigation !== 'null') {
        this.userChosenCategories = userConfiguration.configuration_in_navbar;
      }
      if (userConfiguration.number_of_texts_in_left_sidebar !== null) {
        this.numberOfTextInLeftSidebar =
          userConfiguration.number_of_texts_in_left_sidebar;
      }
      if (userConfiguration.noritification_for_themes !== 'null') {
        this.userChosenTags = userConfiguration.noritification_for_themes;
      }
    }
  }

  public resetConfiguration() {
    this.userChosenCategories = [];
    this.userChosenTags = [];
    this.numberOfTextInLeftSidebar = null;
    this.userChosenTheme = null;
  }
}
