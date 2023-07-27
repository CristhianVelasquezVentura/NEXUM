import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInformationComponent } from './pages/general-information/general-information.component';
import { DocumentReviewComponent } from './pages/document-review/document-review.component';
import { SignaturesSectionsComponent } from './pages/signatures-sections/signatures-sections.component';
import { SignatureOrganizationComponent } from './pages/signature-organization/signature-organization.component';
import { FinalRevisionComponent } from './pages/final-revision/final-revision.component';
import {AuthenticationRoutingModule} from "@app/modules/authentication/authentication-routing.module";
import {SendDocumentRoutingModule} from "@app/modules/send-document/send-document-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {UiModule} from "@app/core/ui/ui.module";
import { FinalMessangeComponent } from './pages/final-messange/final-messange.component';



@NgModule({
  declarations: [
    GeneralInformationComponent,
    DocumentReviewComponent,
    SignaturesSectionsComponent,
    SignatureOrganizationComponent,
    FinalRevisionComponent,
    FinalMessangeComponent
  ],
  imports: [
    CommonModule,
    SendDocumentRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    UiModule
  ]
})
export class SendDocumentModule { }
