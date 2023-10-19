import { Component } from '@angular/core';

@Component({
  selector: 'app-workflow-create',
  templateUrl: './workflow-create.component.html',
  styleUrls: ['./workflow-create.component.scss']
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
