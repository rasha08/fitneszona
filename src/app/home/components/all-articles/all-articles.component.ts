import { Component, AfterViewInit } from '@angular/core';

declare const $;

@Component({
  selector: 'all-articles',
  templateUrl: './all-articles.html'
})
export class AllArticlesComponent implements AfterViewInit {
  ngAfterViewInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
    });
  }
}
