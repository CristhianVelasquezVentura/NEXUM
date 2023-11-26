import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import { IWorkflow } from '../../models/steps';

@Component({
  selector: 'workflow-item',
  templateUrl: './workflow-item.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class WorkflowItemComponent {

  @Input() workflow!:IWorkflow;
  @Output() selectItem: EventEmitter<IWorkflow> = new EventEmitter<IWorkflow>();

  public emitSelectItem(){
    this.selectItem.emit(this.workflow)
  }
}
