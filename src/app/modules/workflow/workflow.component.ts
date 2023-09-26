import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkflowService } from './services/workflow.service';
import { Workflow } from './models/steps';
import { error } from 'console';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit, OnDestroy {
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
          this.isBlockPage = false;

          if (!response.data) {
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
        },
        error: (error) => {
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
  // private getWorkflows(): void {
  //   this.isBlockPage = true;
  //   this._subscription.add(
  //     this._workflowService.getWorkflows().subscribe(
  //       (response) => {
  //         if (response.error) {
  //           // this._messageService.add({
  //           //   type: 'error',
  //           //   message: response.msg,
  //           //   life: 5000
  //           // });
  //         } else {
  //           if (response.data) {
  //             this.workflows = response.data;
  //             this.workflowsPagination = this.workflows.slice(this.leftLimit, this.rightLimit);
  //             this.totalWorkflowsPagination = Math.ceil(this.workflows.length / this.paginationValue);
  //             console.log(this.workflows)
  //           }

  //         }
  //         this.isBlockPage = false;
  //       },
  //       (error: Error) => {
  //         console.error(error.message);
  //         // this._messageService.add({
  //         //   type: 'error',
  //         //   message: 'No se pudo consultar el listado de flujos de trabajo, intente nuevamente !',
  //         //   life: 5000
  //         // });
  //         this.isBlockPage = false;
  //       }
  //     )
  //   );
  // }
}
