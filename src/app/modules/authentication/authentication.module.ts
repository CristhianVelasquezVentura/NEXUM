import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule} from "@app/modules/authentication/authentication-routing.module";
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";
import { RestartPasswordComponent } from './pages/restart-password/restart-password.component';
import { UiModule } from '@app/core/ui/ui.module';
import { ToastService } from '@app/core/ui/services/toast/toast.service';


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
        RouterModule,
        UiModule
    ],
    providers: [ToastService]
})
export class AuthenticationModule { }
