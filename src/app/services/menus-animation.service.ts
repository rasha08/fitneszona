import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MenuAnimationService {
  private response = new Subject();
  public response$ = this.response.asObservable();

  constructor() {}
}
