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
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._listenForBottomMenuStatusChange();
    this._subscribeToConfigurationFetchEvent();
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

  public addToUserCategories(category) {
    this.userChosenCategories.push(category);
  }

  public addOrRemoveUserTags(tag) {
    // If tag not in array then add tag to array
    // Else delete him from array
    if (
      this.userChosenTags.find(tagInArray => tag === tagInArray) === undefined
    ) {
      this.userChosenTags.push(tag);
    } else {
      const tagIndex = this.userChosenTags.indexOf(tag);
      this.userChosenTags.splice(tagIndex, 1);
    }
  }

  public setUserTheme(theme) {
    this.userChosenTheme = theme;
  }

  public setNumberOfTexts(number) {
    this.numberOfTextInLeftSidebar = number;
  }

  public getUserId() {
    return this._authService.getUser()['id'] || false;
  }

  public sendConfiguration() {
    const configuration = {
      theme: this.userChosenTheme,
      categoriesInNavigation:
        this.userChosenCategories !== [] ? this.userChosenCategories : null,
      numbersOfTextsInLeftSidebar: this.numberOfTextInLeftSidebar,
      notificationOfThemes:
        this.userChosenTags !== [] ? this.userChosenTags : null
    };
    const userId = this.getUserId();
    if (userId) {
      this._bottomMenuService.setUserConfiguration(
        JSON.stringify(configuration),
        userId
      );
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
}
