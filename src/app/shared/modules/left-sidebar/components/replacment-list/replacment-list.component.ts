import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { ReplacmentListService } from '../../services/replacment-list.service';

declare const $: any;

@Component({
  selector: "replacment-list-component",
  templateUrl: "./replacment-list.html"
})
export class ReplacmentListComponent implements OnInit {
  private _isReplacmentListOpen = false;
  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _replacmentListService: ReplacmentListService
  ) {}

  public ngOnInit() {
    this._listenForReplacmentListToggleState();
  }

  private _listenForReplacmentListToggleState() {
    this._subscriptions.push(
      this._replacmentListService.replacmentListStateChange$.subscribe(() => {
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
