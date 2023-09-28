import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Workflow } from '../../models/steps';

@Component({
  selector: 'workflow-item',
  templateUrl: './workflow-item.component.html',
  encapsulation: ViewEncapsulation.None

})
export class WorkflowItemComponent {

  @Input()
  workflow!:Workflow;


}
