import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html'
})
export class LoaderComponent implements OnInit {
  public shouldShowLoader: any = false;

  constructor(private _loaderService: LoaderService) {}

  ngOnInit() {
    this._loaderService.$loaderStateChange.subscribe(
      shouldShowLoader => (this.shouldShowLoader = shouldShowLoader)
    );
  }
}
