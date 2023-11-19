import {Routes} from "@angular/router";
import {DocumentReviewComponent} from "@app/modules/send-document/pages/document-review/document-review.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./send-document.component').then(c => c.SendDocumentComponent),
  },
  {
    path: 'general-information',
    loadComponent: () => import('./pages/general-information/general-information.component').then(c => c.GeneralInformationComponent),
  },
  {
    path: 'document-review',
    component: DocumentReviewComponent,
    loadComponent: () => import('./pages/document-review/document-review.component').then(c => c.DocumentReviewComponent),
  },
  {
    path: 'signatures-sections',
    loadChildren: () => import('./pages/signatures-sections/signatures-sections.routes').then((m) => m.routes)
  },
  {
    path: 'signature-organization',
    loadChildren: () => import('./pages/signature-organization/signature-organization.routes').then((m) => m.routes)
  },
  {
    path: 'final-revision',
    loadComponent: () => import('./pages/final-revision/final-revision.component').then(c => c.FinalRevisionComponent),
  },
  {
    path: 'final-message',
    loadComponent: () => import('@app/modules/send-document/pages/final-message/final-message.component').then(c => c.FinalMessageComponent),
  }
];
