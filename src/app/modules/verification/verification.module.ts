import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TrackingDocumentComponent, ValidateDocumentComponent} from "@app/modules/verification/pages";
import {ToastService} from "@app/public/services/toast/toast.service";


@NgModule({
    imports: [
    CommonModule,
    VerificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    VerificationComponent,
    TrackingDocumentComponent,
    ValidateDocumentComponent
],
    providers: [ToastService]
})
export class VerificationModule { }
