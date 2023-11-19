import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./document-sign-process.component').then(c => c.DocumentSignProcessComponent)
  }
];
