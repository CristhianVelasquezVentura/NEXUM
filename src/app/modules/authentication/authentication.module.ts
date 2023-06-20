import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule} from "@app/modules/authentication/authentication-routing.module";
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RecoveryComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
