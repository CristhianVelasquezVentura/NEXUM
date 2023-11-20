import {Routes} from "@angular/router";
import {OrderSignDocComponent} from "@app/modules/send-document/pages/signature-organization/pages/order-sign-doc/order-sign-doc.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./signature-organization.component').then(m => m.SignatureOrganizationComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/order-sign-list/order-sign-list.component').then(m => m.OrderSignListComponent)
  },
  {
    path: 'doc',
    loadComponent: () => import('./pages/order-sign-doc/order-sign-doc.component').then(m => m.OrderSignDocComponent)
  }
];
