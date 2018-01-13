import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html'
})
export class LoaderComponent implements OnInit {
  public shouldShowLoader: any = false;

  constructor(
    private _loaderService: LoaderService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._loaderService.$loaderStateChange.subscribe(shouldShowLoader => {
      this.shouldShowLoader = shouldShowLoader;
      this._changeDetectorRef.detectChanges();
    });
  }
}
