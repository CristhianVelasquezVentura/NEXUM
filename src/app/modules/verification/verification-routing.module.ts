import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VerificationComponent} from "@app/modules/verification/verification.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'document'
  },
  {
    path: 'document',
    component: VerificationComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationRoutingModule { }
