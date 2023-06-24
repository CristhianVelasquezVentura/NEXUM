import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrackingDocumentComponent, ValidateDocumentComponent} from "@app/modules/verification/pages";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'document',
    pathMatch: "full"
  },
  {
    path: 'document',
    component: ValidateDocumentComponent
  },
  {
    path: 'tracking',
    component: TrackingDocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationRoutingModule { }
