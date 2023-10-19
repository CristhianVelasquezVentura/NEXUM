import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowComponent } from './workflow.component';
import { WorkflowListComponent } from '@app/modules/workflow/pages/workflow-list/workflow-list.component';
import { WorkflowRoutingModule } from '@app/modules/workflow/workflow-routing.module';
import { UiModule } from '@app/core/ui/ui.module';
import { WorkflowCreateComponent } from '@app/modules/workflow/pages/workflow-create/workflow-create.component';
import { GeneralInfoWorkflowComponent } from './pages/general-info-workflow/general-info-workflow.component';
import { SignStyleComponent } from './pages/sign-style/sign-style.component';
import { NotifySignersComponent } from './pages/notify-signers/notify-signers.component';
import { OtpConfigComponent } from './pages/otp-config/otp-config.component';
import { AlertSignersComponent } from './pages/alert-signers/alert-signers.component';
import { FinalMessangeWorkflowComponent } from './pages/final-messange-workflow/final-messange-workflow.component';
import { WorkflowItemComponent } from './components/workflow-item/workflow-item.component';
import { RouterLink } from '@angular/router';
import { WorkflowStepListComponent } from './components/workflow-step-list/workflow-step-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, ToastModule } from 'ecapture-ng-ui';

@NgModule({
  declarations: [
    WorkflowComponent,
    WorkflowListComponent,
    WorkflowCreateComponent,
    GeneralInfoWorkflowComponent,
    SignStyleComponent,
    NotifySignersComponent,
    OtpConfigComponent,
    AlertSignersComponent,
    FinalMessangeWorkflowComponent,
    WorkflowItemComponent,
    WorkflowStepListComponent,
  ],
  imports: [CommonModule, WorkflowRoutingModule, UiModule, RouterLink, FormsModule,
    ReactiveFormsModule,ToastModule,ModalModule,    ],
})
export class WorkflowModule {}
