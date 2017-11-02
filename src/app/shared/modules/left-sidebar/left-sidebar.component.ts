import { Component, ChangeDetectorRef, OnInit } from "@angular/core";

import { Subscription } from "rxjs/Subscription";
//services
import { ConfigurationService } from "../../../services/configuration.service";
import { AuthService } from "../../../services/auth.service";
import { ReplacmentListService } from "./services/replacment-list.service";

@Component({
  selector: "left-sidebar-component",
  templateUrl: "./left-sidebar.html"
})
export class LeftSidebarComponent implements OnInit {
  public openCategory;
  public userCategories;
  public openText;
  public isUserLogedIn;
  public configuration;
  public subscription: Subscription;
  public user;
  public userTags;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _configurationService: ConfigurationService,
    private _authService: AuthService,
    private _replacmentListService: ReplacmentListService
  ) {}

  ngOnInit() {
    this.subscribeToUserConfiguration();
    this.getUserTags(1);
    this.getUserActiveCategories(1);
  }

  toggleCategory(category) {
    if (this.openCategory === category) {
      this.openCategory = null;
    } else {
      this.openCategory = category;
    }

    this._changeDetectorRef.detectChanges();
  }

  isCategoryOpen(category) {
    return this.openCategory === category;
  }

  toggleText(text) {
    if (this.openText === text) {
      this.openText = null;
    } else {
      this.openText = text;
    }

    this._changeDetectorRef.detectChanges();
  }

  isTextOpen(text) {
    return this.openText === text;
  }

  subscribeToUserConfiguration() {
    this.subscription = this._configurationService.openConfiguration$.subscribe(
      response => {
        if (response[0] === "tags") {
          this.userTags = response[1];
        } else {
          this.userCategories = response;
        }
      },
      error => console.log(error)
    );
  }
  getUserActiveCategories(id) {
    this._configurationService.getUserActiveCategories(id);
  }
  getUserTags(id) {
    this._configurationService.getUserTags(id);
  }

  openReplacmentList(tag, event) {
    event.stopPropagation();
    this._replacmentListService.toggleReplacmentListState(tag);
  }
}
