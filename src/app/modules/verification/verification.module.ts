import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';
import {UiModule} from "@app/core/ui/ui.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TrackingDocumentComponent, ValidateDocumentComponent} from "@app/modules/verification/pages";
import {ToastService} from "@app/public/services/toast/toast.service";


@NgModule({
  declarations: [
    VerificationComponent,
    TrackingDocumentComponent,
    ValidateDocumentComponent
  ],
  imports: [
    CommonModule,
    VerificationRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ToastService]
})
export class VerificationModule { }
