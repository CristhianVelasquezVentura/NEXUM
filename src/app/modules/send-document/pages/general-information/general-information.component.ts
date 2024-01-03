import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastService} from '@app/public/services/toast/toast.service';
import {IWorkflow, Annexes} from '@app/modules/workflow/models/steps';
import {WorkflowService} from '@app/modules/workflow/services/workflow.service';
import {Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ToastComponent} from '@app/public/toast/toast.component';
import {HeaderNexumComponent, BlockPageComponent} from '@app/core/ui';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {GeneralInfoFormComponent} from "@app/modules/send-document/componentes";
import {AttachedDocument, RequestedDocument} from "@app/core/models/workflow/workflow.model";
import {AttachedDocuments, FormSendDocumentService} from "@app/core/forms/send-document";
import {IValuesStep1} from "@app/core/models/send-document";

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss'],
  standalone: true,
  imports: [
    HeaderNexumComponent, ReactiveFormsModule, NgFor, NgIf, BlockPageComponent, ToastComponent, GeneralInfoFormComponent, AsyncPipe
  ],
  providers: [ToastService]
})
export class GeneralInformationComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  public workflows: IWorkflow[] = [];
  public annexes: Annexes[] = [];

  public requestedDocument: RequestedDocument[] = [];

  public isBlockPage: boolean = false;

  public markAsTouched = new Subject<boolean>();

  constructor(
    private _messageService: ToastService,
    private _workflowService: WorkflowService,
    private _formService: FormSendDocumentService,
    private router: Router
  ) {
    //window.addEventListener('beforeunload', () => {
    //    console.log('beforeunload')
    //})
  }

  ngOnInit(): void {
    this.getWorkflows();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public getWorkflows() {
    this._subscription.add(
      this._workflowService.getWorkflows(10, 0).subscribe({
          next: (response) => {
            if (response.error) {
              this._messageService.add({
                type: 'error',
                message: response.msg,
                life: 5000
              });
              return
            }

            this.workflows = response.data || [];
          }, error: (error) => {
            console.error(error);
          }
        }
      )
    );
  }

  public navigateToRoute(route: string): void {
    this.router.navigateByUrl(route);
  }

  public changeAnnexes(event: boolean, position: number): void {
    this.requestedDocument[position].required = event;
  }

  public nextStep() {
    this.validateForm()

    if (this._formService.generalInfoForm.invalid) return

    this.saveBasicInformation();
    this.navigateToRoute('/send-document/document-review');
  }

  public saveBasicInformation(): void {

    const values: IValuesStep1 = {
      formMainData: {
        ...this._formService.generalInfoForm.getRawValue(),
        attachedDocuments: this._formService.generalInfoForm.controls.attachedDocuments.getRawValue() as AttachedDocuments[]
      },
      requestDocument: this._formService.requestedDocument,
    }
    sessionStorage.setItem('send-document-step-1', JSON.stringify(values));

  }

  private validateForm() {
    console.log(this._formService.generalInfoForm)
    this.markAsTouched.next(true);
    if (this._formService.generalInfoForm.invalid) {
      this._messageService.add({
        type: 'warning',
        message: 'Complete los datos solicitados de información general',
        life: 5000
      });
    }
  }

}
