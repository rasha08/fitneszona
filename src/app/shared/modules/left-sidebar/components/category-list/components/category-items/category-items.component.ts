import { Component, ChangeDetectorRef, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { ConfigurationService } from "../../../../../../../services/configuration.service";

@Component({
  selector: "category-items-component",
  templateUrl: "./category-items.html"
})
export class CategoryItemsComponent implements OnInit{
  public openText;
  @Input() public texts;
  public textsForDisplay;
  public numberOfArticles;
  private _subscription: Subscription;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _condifurationService: ConfigurationService
  ) {}

  ngOnInit(){

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

}
