import {Component} from '@angular/core';

import {
  WorkflowStepDetailsComponent
} from "@app/modules/workflow/components/workflow-step-details/workflow-step-details.component";
import {RouterLink} from "@angular/router";
import {HeaderNexumComponent} from "@app/core/ui";

@Component({
  selector: 'app-workflow-info-create',
  templateUrl: './workflow-info-create.component.html',
  styleUrls: ['./workflow-info-create.component.scss'],
  imports: [
    WorkflowStepDetailsComponent,
    RouterLink,
    HeaderNexumComponent
  ],
  standalone: true
})
export class WorkflowInfoCreateComponent {

  public startCreateProcess() {

    this.restart()

  }

  private restart() {
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
