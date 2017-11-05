import { Component,Input } from "@angular/core";

@Component({
  selector: "category-item-details-component",
  templateUrl: "./category-item-details.html"
})
export class CategoryItemDetailsComponent {
  @Input() public text;
}
