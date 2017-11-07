import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { ReplacmentListService } from '../../services/replacment-list.service';
import { ConfigurationService } from "../../../../../services/configuration.service";

declare const $: any;

@Component({
  selector: "replacment-list-component",
  templateUrl: "./replacment-list.html"
})
export class ReplacmentListComponent implements OnInit {
  private _isReplacmentListOpen = false;
  private _subscriptions: Array<Subscription> = [];
  @Input() public tags;
  @Output() public newTag: EventEmitter<string> = new EventEmitter();
  public replacmentsTags = [];
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _replacmentListService: ReplacmentListService,
    private _configurationService: ConfigurationService
  ) {}

  public ngOnInit() {
    this._listenForReplacmentListToggleState();
  }

  public replaceTag(tag){
    
    
  }

  public initialiseUserTagsInLeftSidebar(id){
    this._replacmentListService.initialiseUserTagsInLeftSidebar(id,this.replacmentsTags);
  }
  public replaceUserTagInSidebar(id){

  }

  private _listenForReplacmentListToggleState() {
    this._subscriptions.push(
      this._replacmentListService.replacmentListStateChange$.subscribe((tag) => {
        console.log(tag);
        this.toggleStyle();
      })
    );
  }

  private toggleStyle() {
    if (this._isReplacmentListOpen) {
      $('#replacment-list').removeClass('open');


    } else {
      $('#replacment-list').addClass('open');
    }

    this._isReplacmentListOpen = !this._isReplacmentListOpen;
    this._changeDetectorRef.detectChanges();
  }
}
