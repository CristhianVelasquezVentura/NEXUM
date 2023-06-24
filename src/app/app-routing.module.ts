import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'sign',
    loadChildren: () => import('./modules/document-sign-process/document-sign-process.module').then((m) => m.DocumentSignProcessModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./modules/verification/verification.module').then((m) => m.VerificationModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'top'
    }),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}
