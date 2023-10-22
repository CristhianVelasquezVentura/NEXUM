import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import { Workflow } from '../../models/steps';

@Component({
  selector: 'workflow-item',
  templateUrl: './workflow-item.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class WorkflowItemComponent {

  @Input() workflow!:Workflow;
  @Output() selectItem: EventEmitter<Workflow> = new EventEmitter<Workflow>();

  public emitSelectItem(){
    this.selectItem.emit(this.workflow)
  }
}
