import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ConfigurationService } from '../../../services/configuration.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-promo-banner',
  templateUrl: './promo-banner.html'
})
export class PromoBannerComponent implements OnInit {
  public promoBanerCssClass = 'closed';
  public isPromoBannerAlowed;
  public bannerTitle = '';
  public bannerImgUrl = '';
  public bannerText = '';

  constructor(
    private _configurationService: ConfigurationService,
    private _localStorageService: LocalStorageService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    // this._listenForConfigurationFetchEvent();
  }

  private _listenForConfigurationFetchEvent() {
    this._configurationService.configurationStatusChange$.subscribe(() => {
      this.isPromoBannerAlowed = !!parseInt(
        this._configurationService.getParam('is_promo_banner_enabled'),
        10
      );

      this.bannerTitle = this._configurationService.getParam('banner_title');
      this.bannerText = this._configurationService.getParam('banner_text');
      this.bannerImgUrl = this._configurationService.getParam(
        'banner_image_url'
      );

      if (this.isPromoBannerAlowed) {
        this._showPromoBanner();
      }
    });
  }

  private _showPromoBanner() {
    const promoBannerTimestamp = this._localStorageService.getKeyIfExists(
      'promoBanner'
    );
    if (!promoBannerTimestamp) {
      setTimeout(() => {
        this.promoBanerCssClass = 'open';
        this._localStorageService.setItem('promoBanner', Date.now());
      }, 30000);
    } else if (Date.now() - JSON.parse(promoBannerTimestamp) > 172800000) {
      setTimeout(() => {
        this.promoBanerCssClass = 'open';
        this._localStorageService.setItem('promoBanner', Date.now());
      }, 30000);
    }
  }

  public hidePromoBanner() {
    this.promoBanerCssClass = 'closed';
    this._changeDetectorRef.detectChanges();
  }
}
