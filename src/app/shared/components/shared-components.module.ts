import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { ResetPaswordComponent } from "./reset-password/reset-password";
import { AlertComponent } from "./alert/alert";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    RegistrationComponent,
    LoginComponent,
    ResetPaswordComponent,
    AlertComponent
  ],
  exports: [
    RegistrationComponent,
    LoginComponent,
    ResetPaswordComponent,
    AlertComponent
  ],
  providers: []
})
export class SharedComponentsModule {}
