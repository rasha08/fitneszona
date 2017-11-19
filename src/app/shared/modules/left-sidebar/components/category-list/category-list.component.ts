import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';

import { ReplacmentListService } from '../../services/replacment-list.service';

@Component({
  selector: 'category-list-component',
  templateUrl: './category-list.html'
})
export class CategoryListComponent implements OnInit {
  public openCategory;
  public openText;
  @Input() numberOfArticlesByTag;
  @Input() public tags;
  public texts;

  constructor(
    private _replacmentListService: ReplacmentListService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

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

  openReplacmentList(tag, index, event) {
    event.stopPropagation();
    this._replacmentListService.toggleReplacmentListState(tag, index);
  }

  public getTagTexts(tag: any) {
    if (!tag) {
      return [];
    }
    return this.numberOfArticlesByTag > tag.texts.length
      ? tag.texts
      : tag.texts.slice(0, this.numberOfArticlesByTag);
  }

  public getTagIndex(tag) {
    return this.tags.indexOf(tag);
  }
}
