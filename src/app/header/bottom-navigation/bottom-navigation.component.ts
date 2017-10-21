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
  private _subscription: Subscription;
  error;
  public userCategories = [];

  constructor(
    private _configurationService: ConfigurationService,
    private _localStorageService: LocalStorageService,
    private _articleCounterService: ArticlesCounterService
  ) {}

  ngOnInit(){
    this.subscribeToUserCategories();
    this.getCategories();
  }

  getCategories(){
    let dateAndTime = new Date();
    let date = dateAndTime.toLocaleDateString().replace(/\//g,'-');
    let time = dateAndTime.toTimeString().slice(0,8);
    let timestring = date + ' ' + time;
    this._articleCounterService.getCategories(timestring);
  }

  subscribeToUserCategories(){
    this._subscription = this._articleCounterService.sendCategoriesToBottomHeader$.subscribe(
      response => {
        for (let key of Object.keys(response)){
            this.userCategories.push([key,response[key]])
        }
      },
      error => console.log(error)
    )
  }

}
