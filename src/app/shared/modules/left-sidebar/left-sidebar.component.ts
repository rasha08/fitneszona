import { Component, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "left-sidebar-component",
  templateUrl: "./left-sidebar.html"
})
export class LeftSidebarComponent {
  public openCategory;
  public openText;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

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
}
