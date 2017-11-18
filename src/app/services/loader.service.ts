import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {
  private _showLoader = new Subject();
  public $loaderStateChange = this._showLoader.asObservable();

  public show() {
    this._showLoader.next(true);
  }

  public hide() {
    this._showLoader.next(false);
  }
}
