import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReplacmentListService } from '../../services/replacment-list.service';
import { ConfigurationService } from '../../../../../services/configuration.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'replacment-list-component',
  templateUrl: './replacment-list.html'
})
export class ReplacmentListComponent implements OnInit {
  @Input() public tags;

  private _subscriptions: Array<Subscription> = [];
  public replacmentTag;
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

  public replaceTag(newTag) {
    let oldTagIndex = this.replacmentTag[1];
    let oldTag = this.replacmentTag[0];
    this._replacmentListService.notifyTagReplacment(newTag, oldTagIndex);
  }

  private _listenForReplacmentListToggleState() {
    this._subscriptions.push(
      this._replacmentListService.replacmentListStateChange$.subscribe(
        replacmentTag => {
          this.replacmentTag = replacmentTag;
          this._changeDetectorRef.detectChanges();
        }
      )
    );
  }
}
