import { Component, AfterViewInit } from '@angular/core';

declare const $;

@Component({
  selector: 'single-article',
  templateUrl: './single-article.html'
})
export class SingleArticleComponent implements AfterViewInit {
  ngAfterViewInit() {
    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
    });
  }
}
