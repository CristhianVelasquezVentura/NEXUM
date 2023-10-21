import { Component } from '@angular/core';
import {UiModule} from "@app/core/ui/ui.module";
import {
  WorkflowStepListComponent
} from "@app/modules/workflow/components/workflow-step-list/workflow-step-list.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-workflow-create',
  templateUrl: './workflow-create.component.html',
  styleUrls: ['./workflow-create.component.scss'],
  imports: [
    UiModule,
    WorkflowStepListComponent,
    RouterLink
  ],
  standalone: true
})
export class WorkflowCreateComponent {

  clearData(){

    sessionStorage.removeItem('generalInfo');
    sessionStorage.removeItem('generalInfo_annexes');
    sessionStorage.removeItem('generalInfo_logo_base64');
    sessionStorage.removeItem('generalInfo_logo_name');

    sessionStorage.removeItem('signStyle');

    sessionStorage.removeItem('notifySignersSMS');
    sessionStorage.removeItem('notifySignersEmail');

    sessionStorage.removeItem('otpConfig');

  }
}
