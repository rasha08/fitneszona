import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

declare let $: any;

@Injectable()
export class ModalService {
  private _isOpen;
  private _openModalTimeout;
  private _openModal = new Subject();
  private _closeModal = new Subject();

  public openModal$ = this._openModal.asObservable();
  public closeModal$ = this._closeModal.asObservable();

  constructor(private _ngZone: NgZone) {}

  public openModal(modalData) {
    if (this._isOpen) {
      return;
    }

    this._isOpen = true;
    this._openModal.next(modalData);
    $('.application').addClass('disabled');
    this._ngZone.runOutsideAngular(() =>
      setTimeout(() => $('#modal').addClass('open'), 0)
    );
  }

  public closeModal() {
    $('#modal').removeClass('open');
    $('.application').removeClass('disabled');
    this._isOpen = false;
    this._closeModal.next();
  }
}
