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
  public replacmentTag;
  @Input() public tags;
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

  public replaceTag(newTag){
    //let userId = this._authService.getUser().id || 1;
    let oldTagIndex = this.replacmentTag[1];
    let oldTag = this.replacmentTag[0];
    //this._replacmentListService.replaceUserTagInSidebar(userId, newTag, oldTagIndex);
    this._replacmentListService.notifyTagReplacment(newTag,oldTagIndex);
  }

  public initialiseUserTagsInLeftSidebar(id){
    this._replacmentListService.initialiseUserTagsInLeftSidebar(id,this.replacmentsTags);
  }
  public replaceUserTagInSidebar(id){

  }

  private _listenForReplacmentListToggleState() {
    this._subscriptions.push(
      this._replacmentListService.replacmentListStateChange$.subscribe((replacmentTag) => {
        this.replacmentTag = replacmentTag;
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
