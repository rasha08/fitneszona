import { Component, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "left-sidebar-component",
  templateUrl: "./left-sidebar.html"
})
export class LeftSidebarComponent {
  public openCategory;
  public openText;
  public openDetails;
  
  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  toggleCategory(category) {
    if (this.openCategory === category) {
      this.openCategory = null;
      this._changeDetectorRef.detectChanges();

      return;
    }

    this.openCategory = category;
    this._changeDetectorRef.detectChanges();
  }

  isCategoryOpen(category) {
    return this.openCategory === category;
  }

  toggleText(text) {
    if (this.openText === text) {
      this.openText = null;
      this._changeDetectorRef.detectChanges();

      return;
    }

    this.openText = text;
    this._changeDetectorRef.detectChanges();
  }

  isTextOpen(text) {
    return this.openText === text;
  }

  toggleDetails(details) {
    if (this.openDetails === details) {
      this.openDetails = null;
      this._changeDetectorRef.detectChanges();

      return;
    }

    this.openDetails = details;
    this._changeDetectorRef.detectChanges();
  }

  areDetailsOpen(details) {
    return this.openDetails === details;
  }
}
