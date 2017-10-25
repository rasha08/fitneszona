import { Component, OnInit } from "@angular/core";
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
  public countedCategories;
  public headerData; 
  constructor(
    private _configurationService: ConfigurationService,
    private _localStorageService: LocalStorageService,
    private _articleCounterService: ArticlesCounterService
  ) {}

  ngOnInit(){
    this.subscribeToActiveCategories();
    this.subscribeToCategoriesWithNewArticles();
    this.getHeaderData();
  }

  getHeaderData(){
    let timestring = this.getTimeAndDate();
    this._articleCounterService.getCategoriesWithNewArticles(timestring);
    this._configurationService.getActiveCategories();
  }

  subscribeToActiveCategories(){
    this._configurationService.openCategories$.subscribe(
      activeCategories => {console.log(activeCategories)
        this.activeCategories = activeCategories;
      },
      error => console.log(error)
    );
  }

  subscribeToCategoriesWithNewArticles(){
    this._articleCounterService.sendCategoriesToBottomHeader$.subscribe(
        countedCategoriesObj => {console.log(countedCategoriesObj);
          this.countedCategories = countedCategoriesObj;
        },
        error => console.log('Error at bottom-navigation:',error)
    );
  }

  checkIfCategoryInArray(category, activeCategories){
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
