import {Routes} from "@angular/router";

export const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'prefix'},
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.routes)
  },
  {
    path: 'signature',
    loadChildren: () => import('./modules/document-sign-process/document-sign-process.routes').then((m) => m.routes)
  },
  {
    path: 'verification',
    loadChildren: () => import('./modules/verification/verification.routes').then((m) => m.routes)
  },
  {
    path: 'send-document',
    loadChildren: () => import('./modules/send-document/send-document.routes').then((m) => m.routes)
  },
  {
    path: 'workflow',
    loadChildren: () => import('./modules/workflow/workflow.routes').then((m) => m.routes)
  },
  {
    path: 'query-docs',
    loadChildren: () => import('./modules/query-docs/query-docs.routes').then((m) => m.routes)
  }
];
