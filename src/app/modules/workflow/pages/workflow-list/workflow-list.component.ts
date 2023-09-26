import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Workflow } from '../../models/steps';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
})
export class WorkflowListComponent implements OnInit, OnDestroy {
  public isBlockPage: boolean = false;
  private _subscription = new Subscription();
  public workflows: Workflow[] = [];
  public workflowsPagination: Workflow[] = [];
  public workflowsPaginationTemp: Workflow[] = [];
  public totalWorkflowsPagination: number = 0;
  public leftLimit: number = 0;
  public paginationValue: number = 5;
  public rightLimit: number = 5;

  constructor(private _workflowService: WorkflowService) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getWorkflows();
  }

  private getWorkflows(): void {
    this.isBlockPage = true;
    this._subscription.add(
      this._workflowService.getWorkflows().subscribe({
        next: (response) => {
          if (response.error) {
            // this._messageService.add({
            //   type: 'error',
            //   message: response.msg,
            //   life: 5000
            // });
            return
          }

          if (!response.data) {
            // this._messageService.add({
            //   type: 'warning',
            //   message: response.msg,
            //   life: 5000
            // });
            return;
          }

          this.workflows = response.data;
          this.workflowsPagination = this.workflows.slice(
            this.leftLimit,
            this.rightLimit
          );
          this.totalWorkflowsPagination = Math.ceil(
            this.workflows.length / this.paginationValue
          );
          console.log(this.workflows);
          this.isBlockPage = false;
        },
        error: (error: Error) => {
          console.error(error.message);
          // this._messageService.add({
          //   type: 'error',
          //   message: 'No se pudo consultar el listado de flujos de trabajo, intente nuevamente !',
          //   life: 5000
          // });
          this.isBlockPage = false;
        },
      })
    );
  }

  public filterWorkflows({ target }: any): void {
    const workflowValue: string = target.value.toLowerCase().trim();
    console.log(workflowValue);
    if (workflowValue == '') {
      this.workflowsPagination = this.workflows;
      return;
    }
    this.workflowsPagination = this.workflows?.filter(
      (workflow: any) => workflow.name.toLowerCase().includes(workflowValue)
    );
  }
}
