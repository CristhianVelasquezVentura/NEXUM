import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInformationComponent } from './pages/general-information/general-information.component';
import { DocumentReviewComponent } from './pages/document-review/document-review.component';
import { SignaturesSectionsComponent } from './pages/signatures-sections/signatures-sections.component';
import { SignatureOrganizationComponent } from './pages/signature-organization/signature-organization.component';
import { FinalRevisionComponent } from './pages/final-revision/final-revision.component';
import {SendDocumentRoutingModule} from "@app/modules/send-document/send-document-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {UiModule} from "@app/core/ui/ui.module";
import { FinalMessangeComponent } from './pages/final-messange/final-messange.component';
import { OrderSignListComponent } from './pages/signature-organization/pages/order-sign-list/order-sign-list.component';
import { OrderSignDocComponent } from './pages/signature-organization/pages/order-sign-doc/order-sign-doc.component';
import {ToastService} from "@app/public/services/toast/toast.service";
import {ToastComponent} from "@app/public/toast/toast.component";


@NgModule({
  declarations: [
    GeneralInformationComponent,
    DocumentReviewComponent,
    SignaturesSectionsComponent,
    SignatureOrganizationComponent,
    FinalRevisionComponent,
    FinalMessangeComponent,
    OrderSignListComponent,
    OrderSignDocComponent
  ],
  imports: [
    CommonModule,
    SendDocumentRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    UiModule,
    ToastComponent
  ],
  providers: [
    ToastService
  ]
})
export class SendDocumentModule { }
