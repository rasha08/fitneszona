import { Component, OnInit, NgZone } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

//Services
import { ConfigurationService } from "../../services/configuration.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { ArticlesCounterService } from "../../services/articles-counter.service";
@Component({
  selector: "app-bottom-navigation",
  templateUrl: "./bottom-navigation.html"
})
export class BottomNavigationComponent {
  public error;
  public activeCategories;
  public categoriesWithNewArticles;
  public headerData;

  constructor(
    private _configurationService: ConfigurationService,
    private _localStorageService: LocalStorageService,
    private _articleCounterService: ArticlesCounterService
  ) {}

  ngOnInit(){
    this.subscribeToConfiguration();
    this.subscribeToCategoriesWithNewArticles();
    this.getHeaderData();
  }

  getHeaderData(){
    let timestring = this.getTimeAndDate();
    this._articleCounterService.getCategoriesWithNewArticles(timestring);
    this._configurationService.getConfiguration();
  }

  subscribeToConfiguration(){
    this._configurationService.configurationStatusChange$.subscribe(
      notification => {
        console.log('Called for categories');
        this.activeCategories = this._configurationService.getParam('active_categories');
        console.log('Actie categories:',this.activeCategories);
      },
      error => console.log(error)
    );
  }

  subscribeToCategoriesWithNewArticles(){
    this._articleCounterService.sendCategoriesToBottomHeader$.subscribe(
        countedCategoriesObj => {
          this.categoriesWithNewArticles = countedCategoriesObj;
        },
        error => console.log('Error at bottom-navigation:',error)
    );
  }

  checkIfCategoryInArray(category, categoryObj){
    let activeCategories = Object.keys(categoryObj);
      if ( activeCategories.indexOf(category) !== -1) return true;
      else return false;
  }

  getTimeAndDate(){
    let dateAndTime = new Date();
    let date = dateAndTime.toLocaleDateString().replace(/\//g,'-');
    let time = dateAndTime.toTimeString().slice(0,8);
    return  date + ' ' + time;
  }


}
