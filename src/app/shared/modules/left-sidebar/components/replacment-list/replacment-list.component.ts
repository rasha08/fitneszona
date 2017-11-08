import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { ReplacmentListService } from '../../services/replacment-list.service';
import { ConfigurationService } from "../../../../../services/configuration.service";
import { AuthService } from "../../../../../services/auth.service";

declare const $: any;

@Component({
  selector: "replacment-list-component",
  templateUrl: "./replacment-list.html"
})
export class ReplacmentListComponent implements OnInit {
  private _isReplacmentListOpen = false;
  private _subscriptions: Array<Subscription> = [];
  public currentTag;
  @Input() public tags;
  @Output() public newTag: EventEmitter<string> = new EventEmitter();
  public replacmentsTags = [];
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _replacmentListService: ReplacmentListService,
    private _configurationService: ConfigurationService,
    private _authService: AuthService
  ) {}

  public ngOnInit() {
    this._listenForReplacmentListToggleState();
  }

  public replaceTag(tag){
    let userId = this._authService.getUser().id;
    let replacmentTagIndex = this.currentTag[1];
    this._replacmentListService.replaceUserTagInSidebar(userId, tag, replacmentTagIndex )
  }

  public initialiseUserTagsInLeftSidebar(id){
    this._replacmentListService.initialiseUserTagsInLeftSidebar(id,this.replacmentsTags);
  }
  public replaceUserTagInSidebar(id){

  }

  private _listenForReplacmentListToggleState() {
    this._subscriptions.push(
      this._replacmentListService.replacmentListStateChange$.subscribe((replacmentTag) => {
        console.log(replacmentTag[0],replacmentTag[1]);
        this.currentTag = replacmentTag;
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
