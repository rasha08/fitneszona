import { Component } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

//Services
import { ConfigurationService } from "../../services/configuration.service";
import { LocalStorageService } from "../../services/local-storage.service";
@Component({
  selector: "app-bottom-navigation",
  templateUrl: "./bottom-navigation.html"
})
export class BottomNavigationComponent {
  private _subscription: Subscription;
  error;
  public userCategories;

  constructor(
    private _configurationService: ConfigurationService,
    private _localStorageService: LocalStorageService
  ) {}

  getUserCategories(){
    this._configurationService.getCategories().subscribe(
      userCategories => this.userCategories = userCategories,
      error => this.error = error
    )
  }

}
