import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "@app/modules/authentication/pages/login/login.component";
import {RecoveryComponent} from "@app/modules/authentication/pages/recovery/recovery.component";
import {RestartPasswordComponent} from "@app/modules/authentication/pages/restart-password/restart-password.component";
import {SendDocumentComponent} from "@app/modules/send-document/send-document.component";
import {GeneralInformationComponent} from "@app/modules/send-document/pages/general-information/general-information.component";
import {DocumentReviewComponent} from "@app/modules/send-document/pages/document-review/document-review.component";
import { SignatureOrganizationComponent } from "./pages/signature-organization/signature-organization.component";
import {FinalRevisionComponent} from "@app/modules/send-document/pages/final-revision/final-revision.component";
import {FinalMessangeComponent} from "@app/modules/send-document/pages/final-messange/final-messange.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'onboarding',
    component: SendDocumentComponent,
  },
  {
    path: 'general-information',
    component: GeneralInformationComponent
  },
  {
    path: 'document-review',
    component: DocumentReviewComponent
  },
  {
    path: 'signatures-sections',
    loadChildren: () => import('./pages/signatures-sections/signatures-sections.module').then((m) => m.SignaturesSectionsModule)
  },
  {
    path: 'signature-organization',
    loadChildren: () => import('./pages/signature-organization/signature-organization.module').then((m) => m.SignatureOrganizationModule)
  },
  {
    path: 'final-revision',
    component: FinalRevisionComponent
  },
  {
    path: 'final-message',
    component: FinalMessangeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class SendDocumentRoutingModule {
}
