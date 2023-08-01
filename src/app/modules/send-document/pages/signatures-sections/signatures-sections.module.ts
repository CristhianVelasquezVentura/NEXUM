import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignaturesSectionsRoutingModule} from "@app/modules/send-document/pages/signatures-sections/signatures-sections-routing.module";
import { SignaturesGroupComponent } from './pages/signatures-group/signatures-group.component';
import { SectionsSignGroupComponent } from './pages/sections-sign-group/sections-sign-group.component';
import { SignatureFormComponent } from './pages/signature-form/signature-form.component';
import { SectionSignFormComponent } from './pages/section-sign-form/section-sign-form.component';
import {UiModule} from "@app/core/ui/ui.module";



@NgModule({
  declarations: [
    SignaturesGroupComponent,
    SectionsSignGroupComponent,
    SignatureFormComponent,
    SectionSignFormComponent
  ],
  imports: [
    CommonModule,
    SignaturesSectionsRoutingModule,
    UiModule
  ]
})
export class SignaturesSectionsModule { }
