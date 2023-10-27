import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WorkflowListComponent} from "@app/modules/workflow/pages/workflow-list/workflow-list.component";
import {
  WorkflowInfoCreateComponent
} from "@app/modules/workflow/pages/workflow-info-create/workflow-info-create.component";
import {
  GeneralInfoWorkflowComponent
} from "@app/modules/workflow/pages/general-info-workflow/general-info-workflow.component";
import {SignStyleComponent} from "@app/modules/workflow/pages/sign-style/sign-style.component";
import {NotifySignersComponent} from "@app/modules/workflow/pages/notify-signers/notify-signers.component";
import {OtpConfigComponent} from "@app/modules/workflow/pages/otp-config/otp-config.component";
import {AlertSignersComponent} from "@app/modules/workflow/pages/alert-signers/alert-signers.component";
import {
  FinalMessageWorkflowComponent
} from "@app/modules/workflow/pages/final-message-workflow/final-message-workflow.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: WorkflowListComponent
  },
  {
    path: 'info-create',
    component: WorkflowInfoCreateComponent
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
    component: FinalMessageWorkflowComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class WorkflowRoutingModule {
}
