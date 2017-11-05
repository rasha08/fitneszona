import { Component, Input, ChangeDetectorRef, OnInit } from "@angular/core";

@Component({
  selector: "category-list-component",
  templateUrl: "./category-list.html"
})
export class CategoryListComponent implements OnInit{
  public openCategory;
  public openText;
  @Input() numOfArticles;
  @Input() public tag;
  public texts;

  constructor(
    public _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(){
  }
  
  isCategoryOpen(category) {
      return this.openCategory === category;
  }

  toggleCategory(category) {
    if (this.openCategory === category) {
      this.openCategory = null;
    } else {
      this.openCategory = category;
    }
    this._changeDetectorRef.detectChanges();
  }

}
