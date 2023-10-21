import {Routes} from "@angular/router";
import {LoginComponent} from "@app/modules/auth/pages/login/login.component";
import {RecoveryComponent} from "@app/modules/auth/pages/recovery/recovery.component";
import {RestartPasswordComponent} from "@app/modules/auth/pages/restart-password/restart-password.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: 'restart-password',
    component: RestartPasswordComponent
  }
];
