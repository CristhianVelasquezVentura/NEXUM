import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';
import { TrackingDocumentComponent } from './pages/tracking-document/tracking-document.component';
import {UiModule} from "@app/core/ui/ui.module";
import { ValidateDocumentComponent } from './pages/validate-document/validate-document.component';
import {DropdownModule} from "ecapture-ng-ui";
import {FormsModule} from "@angular/forms";


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
    DropdownModule,
    FormsModule
  ]
})
export class VerificationModule { }
