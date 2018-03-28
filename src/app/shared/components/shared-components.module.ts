import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ResetPaswordComponent } from './reset-password/reset-password';
import { AlertComponent } from './alert/alert';
import { LoaderComponent } from './loader/loader.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { PromoBannerComponent } from './promo-banner/promo-banner.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [
    RegistrationComponent,
    LoginComponent,
    ResetPaswordComponent,
    AlertComponent,
    LoaderComponent,
    SearchResultsComponent,
    CustomerSupportComponent,
    PromoBannerComponent
  ],
  exports: [
    RegistrationComponent,
    LoginComponent,
    ResetPaswordComponent,
    AlertComponent,
    LoaderComponent,
    SearchResultsComponent,
    CustomerSupportComponent,
    PromoBannerComponent
  ],
  providers: []
})
export class SharedComponentsModule {}
