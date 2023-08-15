import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowComponent } from './workflow.component';
import { ListWorkflowsComponent } from './pages/list-workflows/list-workflows.component';
import {WorkflowRoutingModule} from "@app/modules/workflow/workflow-routing.module";
import {UiModule} from "@app/core/ui/ui.module";
import { CreateWorkflowComponent } from './pages/create-workflow/create-workflow.component';
import { GeneralInfoWorkflowComponent } from './pages/general-info-workflow/general-info-workflow.component';
import { SignStyleComponent } from './pages/sign-style/sign-style.component';
import { NotifySignersComponent } from './pages/notify-signers/notify-signers.component';
import { OtpConfigComponent } from './pages/otp-config/otp-config.component';
import { AlertSignersComponent } from './pages/alert-signers/alert-signers.component';
import { FinalMessangeWorkflowComponent } from './pages/final-messange-workflow/final-messange-workflow.component';



@NgModule({
  declarations: [
    WorkflowComponent,
    ListWorkflowsComponent,
    CreateWorkflowComponent,
    GeneralInfoWorkflowComponent,
    SignStyleComponent,
    NotifySignersComponent,
    OtpConfigComponent,
    AlertSignersComponent,
    FinalMessangeWorkflowComponent
  ],
  imports: [
    CommonModule,
    WorkflowRoutingModule,
    UiModule
  ]
})
export class WorkflowModule { }
