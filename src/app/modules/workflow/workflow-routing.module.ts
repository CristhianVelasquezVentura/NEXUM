import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FinalRevisionComponent} from "@app/modules/send-document/pages/final-revision/final-revision.component";
import { ListWorkflowComponent } from "@app/modules/workflow/pages/list-workflow/list-workflow.component";
import {CreateWorkflowComponent} from "@app/modules/workflow/pages/create-workflow/create-workflow.component";
import {GeneralInfoWorkflowComponent} from "@app/modules/workflow/pages/general-info-workflow/general-info-workflow.component";
import {SignStyleComponent} from "@app/modules/workflow/pages/sign-style/sign-style.component";
import {NotifySignersComponent} from "@app/modules/workflow/pages/notify-signers/notify-signers.component";
import {OtpConfigComponent} from "@app/modules/workflow/pages/otp-config/otp-config.component";
import {AlertSignersComponent} from "@app/modules/workflow/pages/alert-signers/alert-signers.component";
import {FinalMessangeWorkflowComponent} from "@app/modules/workflow/pages/final-messange-workflow/final-messange-workflow.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListWorkflowComponent
  },
  {
    path: 'create',
    component: CreateWorkflowComponent
  },
  {
    path: 'create/general-information',
    component: GeneralInfoWorkflowComponent
  },
  {
    path: 'create/sign-style',
    component: SignStyleComponent
  },
  {
    path: 'create/notify-signers',
    component: NotifySignersComponent
  },
  {
    path: 'create/otp-config',
    component: OtpConfigComponent
  },
  {
    path: 'create/alert-signers',
    component: AlertSignersComponent
  },
  {
    path: 'create/finish',
    component: FinalMessangeWorkflowComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class WorkflowRoutingModule {
}
