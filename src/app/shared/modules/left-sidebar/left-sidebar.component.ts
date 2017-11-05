import { Component, ChangeDetectorRef, OnInit } from "@angular/core";

import { Subscription } from "rxjs/Subscription";
//services
import { ConfigurationService } from "../../../services/configuration.service";
import { AuthService } from "../../../services/auth.service";
import { ArticlesService } from "../../../services/articles.service";

@Component({
  selector: "left-sidebar-component",
  templateUrl: "./left-sidebar.html"
})
export class LeftSidebarComponent implements OnInit {
  public allArticles;
  public openCategory;
  public openText;
  public isUserLogedIn;
  public configuration;
  public subscription: Subscription[] = [];
  public user;
  public tags = [];
  public numOfArticles;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _configurationService: ConfigurationService,
    private _authService: AuthService,
    private _articleService: ArticlesService
  ) {}

  ngOnInit() {
    this.subscribeToUserConfigurationAndArticles();
    this.getAllArticles();
  }

  getAllArticles() {
    this._articleService.getAllArticle();
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

  subscribeToUserConfigurationAndArticles() {
    this.subscription.push(
      this._configurationService.openConfiguration$.subscribe(
        notification => {
          let number = this._configurationService.getParam(
            "number_of_articles_in_sidebar"
          );
          this.numOfArticles = number;
          let tags = this._configurationService.getParam("tags_priority_list");
          for (var i = 0; i < number; i++) {
            this.tags.push({
              name: tags[i],
              texts: []
            });
          }
          if (this.allArticles !== undefined) {
            this.filterTexts();
          }
        },
        error => console.log(error)
      )
    );
    this.subscription.push(
      this._articleService.notify$.subscribe(param => {
        if (param === "allArticles") {
          this.allArticles = this._articleService.allArticles;
        }
        if (this.tags !== undefined) {
          this.filterTexts();
        }
      })
    );
  }

  filterTexts() {
    for (let tag of this.tags) {
      for (let article of this.allArticles) {
        let articleTags = article.tags;
        if (
          articleTags.indexOf(tag.name) !== -1 &&
          !this.isArticleAssinged(article)
        ) {
          tag.texts.push(article);
        }
      }
      //console.log('Before sorting:',tag.texts);
      tag.texts.sort(function(article1, article2) {
        let diff =
          article1.tags.indexOf(tag.name) - article2.tags.indexOf(tag.name);
        return diff;
      });
      //console.log('After sorting',tag.texts);
    }
  }

  isArticleAssinged(article) {
    for (let tag of this.tags) {
      if (tag.texts.indexOf(article) !== -1) {
        return true;
      }
    }
    return false;
  }
}
