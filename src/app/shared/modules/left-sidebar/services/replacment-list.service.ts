import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ReplacmentListService {
  private _replacmentListStateChange = new Subject();
  public replacmentListStateChange$ = this._replacmentListStateChange.asObservable();

  public toggleReplacmentListState(tag) {
    this._replacmentListStateChange.next(tag);
  }
}
