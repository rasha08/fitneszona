import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { SharedComponentsModule } from "./shared/components/shared-components.module";
import { HeaderModule } from "./header/header.module";

/* APP SERVICES */
import { AuthService } from "./services/auth.service";
import { UserHTTPService } from "./services/user-http.service";
import { ModalService } from "./services/modal.service";
import { ValidtorService } from "./services/validator.service";
import { ResponseService } from "./services/response.service";
import { AlertService } from "./services/alert.service";
import { ArticlesHTTPService } from './services/atricles-http.service';
import { UserDataService } from './services/user-data.service';
import { UtilsService } from './services/utils.service';
import { ArticlesService } from './services/articles.service';

/* ENTRY COMPONENTS */
import { LoginComponent } from "./shared/components/login/login.component";
import { RegistrationComponent } from "./shared/components/registration/registration.component";
import { ResetPaswordComponent } from "./shared/components/reset-password/reset-password";
import { AlertComponent } from "./shared/components/alert/alert";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpModule, SharedComponentsModule, HeaderModule],
  providers: [
    AuthService,
    UserHTTPService,
    ModalService,
    ValidtorService,
    ResponseService,
    AlertService,
    ArticlesHTTPService,
    UserDataService,
    UtilsService,
    ArticlesService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegistrationComponent,
    ResetPaswordComponent,
    AlertComponent
  ]
})
export class AppModule {}
