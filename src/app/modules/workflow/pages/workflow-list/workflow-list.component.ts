import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IWorkflow} from '../../models/steps';
import {WorkflowService} from '../../services/workflow.service';

import {RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {WorkflowItemComponent} from "@app/modules/workflow/components/workflow-item/workflow-item.component";
import {BlockPageComponent, HeaderNexumComponent, ToolbarComponent} from "@app/core/ui";
import {ToastService} from "@app/public/services/toast/toast.service";

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss'],
  imports: [
    RouterLink,
    NgOptimizedImage,
    WorkflowItemComponent,
    NgForOf,
    NgIf,
    ToolbarComponent,
    HeaderNexumComponent,
    BlockPageComponent
  ],
  standalone: true
})
export class WorkflowListComponent implements OnInit, OnDestroy {
  public isBlockPage: boolean = false;
  private _subscription = new Subscription();
  public workflows: IWorkflow[] = [];
  public workflowsPagination: IWorkflow[] = [];
  public workflowsPaginationTemp: IWorkflow[] = [];
  public totalWorkflowsPagination: number = 0;
  public leftLimit: number = 0;
  public paginationValue: number = 5;
  public rightLimit: number = 5;

  constructor(
      private _workflowService: WorkflowService,
      private _messageService: ToastService,
  ) {
  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.getWorkflows();
  }

  private getWorkflows(): void {
    this.isBlockPage = true;
    this._subscription.add(
      this._workflowService.getWorkflows(10, 0).subscribe({
        next: (response) => {
          this.isBlockPage = false;
          if (response.error) {
            this._messageService.add({
              type: 'error',
              message: response.msg,
              life: 5000
            });
            return
          }

          if (!response.data) {
            this._messageService.add({
              type: 'warning',
              message: response.msg,
              life: 5000
            });
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
        error: (error: Error) => {
          console.error(error.message);
          this.isBlockPage = false;
        },
      })
    );
  }

  public filterWorkflows({target}: any): void {
    const workflowValue: string = target.value.toLowerCase().trim();
    if (workflowValue == '') {
      this.workflowsPagination = this.workflows;
      return;
    }
    this.workflowsPagination = this.workflows?.filter(
      (workflow: any) => workflow.name.toLowerCase().includes(workflowValue)
    );
  }

  public showDetailWorkflow(workflow: IWorkflow) {

  }
}
