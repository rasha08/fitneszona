import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";

import { UserHTTPService } from "../../../../services/user-http.service";

@Injectable()
export class ReplacmentListService {
  private _replacmentListStateChange = new Subject();
  public replacmentListStateChange$ = this._replacmentListStateChange.asObservable();
  private _replaceTagListNotification = new Subject();
  public replaceTagListNotification$ = this._replaceTagListNotification.asObservable();
  
  constructor(
    private _http: Http,
    private _userHTTPService: UserHTTPService
  ) {}

  public toggleReplacmentListState(tag, index) {
    this._replacmentListStateChange.next([tag, index]);
  }

  public initialiseUserTagsInLeftSidebar(id, tags){
    this._userHTTPService.initilaiseUserTagsInLeftSidebar(id,tags).subscribe(
      response => console.log(response),
      error => console.log(error)
    )
  }

  public replaceUserTagInSidebar(id, tag, index){
    this._userHTTPService.replaceUserTagInSidebar(id,tag,index).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  public notifyTagReplacment(newTag, oldTagIndex){
    this._replaceTagListNotification.next([newTag, oldTagIndex]);
  }

  public setUser
}
