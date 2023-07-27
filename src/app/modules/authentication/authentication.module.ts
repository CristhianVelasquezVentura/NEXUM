import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule} from "@app/modules/authentication/authentication-routing.module";
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";
import { RestartPasswordComponent } from './pages/restart-password/restart-password.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RecoveryComponent,
    RestartPasswordComponent
  ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class AuthenticationModule { }
