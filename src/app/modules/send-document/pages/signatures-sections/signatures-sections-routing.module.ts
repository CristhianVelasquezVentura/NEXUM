import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignaturesSectionsComponent} from "@app/modules/send-document/pages/signatures-sections/signatures-sections.component";
import { SignaturesGroupComponent } from "./pages/signatures-group/signatures-group.component";
import {SignatureFormComponent} from "@app/modules/send-document/pages/signatures-sections/pages/signature-form/signature-form.component";
import {SectionSignFormComponent} from "@app/modules/send-document/pages/signatures-sections/pages/section-sign-form/section-sign-form.component";
import {SectionsSignGroupComponent} from "@app/modules/send-document/pages/signatures-sections/pages/sections-sign-group/sections-sign-group.component";

const routes: Routes = [
  {
    path: '',
    component: SignaturesSectionsComponent,
  },
  {
    path: 'signatures',
    component: SignaturesGroupComponent,
  },
  {
    path: 'sections-sign',
    component: SectionsSignGroupComponent,
  },
  {
    path: 'signatures/form',
    component: SignatureFormComponent,
  },
  {
    path: 'sections-sign/form',
    component: SectionSignFormComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class SignaturesSectionsRoutingModule {
}
