import { Component, AfterViewInit } from '@angular/core';

declare const $;

@Component({
  selector: 'category',
  templateUrl: './category.html'
})
export class CategoryComponent implements AfterViewInit {
  ngAfterViewInit() {
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }
}
