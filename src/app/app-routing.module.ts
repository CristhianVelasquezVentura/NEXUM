import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'prefix'},
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'signature',
    loadChildren: () => import('./modules/document-sign-process/document-sign-process.module').then((m) => m.DocumentSignProcessModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./modules/verification/verification.module').then((m) => m.VerificationModule)
  },
  {
    path: 'send-document',
    loadChildren: () => import('./modules/send-document/send-document.module').then((m) => m.SendDocumentModule)
  },
  {
    path: 'workflow',
    loadChildren: () => import('./modules/workflow/workflow.module').then((m) => m.WorkflowModule)
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
