import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

/* MODULES */
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { HeaderModule } from './header/header.module';
import { BottomMenuModule } from './shared/modules/bottom-menu/bottom-menu.module';
import { RightSidebarModule } from './shared/modules/right-sidebar/right-sidebar.module';
import { HomeModule } from './home/home.module';

/* APP SERVICES */
import { AuthService } from './services/auth.service';
import { UserHTTPService } from './services/user-http.service';
import { ModalService } from './services/modal.service';
import { ValidatorService } from './services/validator.service';
import { ResponseService } from './services/response.service';
import { AlertService } from './services/alert.service';
import { ArticlesHTTPService } from './services/atricles-http.service';
import { UserDataService } from './services/user-data.service';
import { UtilsService } from './services/utils.service';
import { ArticlesService } from './services/articles.service';
import { LocalStorageService } from './services/local-storage.service';
import { ConfigurationService } from './services/configuration.service';
import { ArticlesCounterService } from './services/articles-counter.service';
import { ArticleCounterHTTPService } from './services/articles-counter-http.service';
import { UserRegistrationService } from './services/user-registration.service';
import { SearchService } from './services/search.service';
import { ConfigurationHTTPService } from './services/configuration-http.service';
import { NotifyService } from './services/notify.service';
import { LoaderService } from './services/loader.service';

/* ENTRY COMPONENTS */
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import { ResetPaswordComponent } from './shared/components/reset-password/reset-password';
import { AlertComponent } from './shared/components/alert/alert';

/* FIREBASE */
import { initializeApp } from 'firebase';
import { firebaseConfig } from './firebase.config';

/*ROUTING */
import { appRoutes } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    SharedComponentsModule,
    HeaderModule,
    BottomMenuModule,
    RightSidebarModule,
    HomeModule
  ],
  providers: [
    LocalStorageService,
    AuthService,
    UserHTTPService,
    ModalService,
    ValidatorService,
    ResponseService,
    AlertService,
    ArticlesHTTPService,
    UserDataService,
    UtilsService,
    ArticlesService,
    ConfigurationService,
    ArticlesCounterService,
    UserRegistrationService,
    SearchService,
    ConfigurationHTTPService,
    ArticleCounterHTTPService,
    NotifyService,
    LoaderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegistrationComponent,
    ResetPaswordComponent,
    AlertComponent
  ]
})
export class AppModule {
  constructor() {
    initializeApp(firebaseConfig);
  }
}
