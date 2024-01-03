import {
  Component,
  Input,
  OnChanges, OnDestroy, OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {IWorkflow} from "@app/modules/workflow/models/steps";
import {DropdownModelWF} from "@app/core/models/signature.model";
import {ToastService} from "@app/public/services/toast/toast.service";
import {WorkflowService} from "@app/modules/workflow/services/workflow.service";
import {FormDocumentRequestComponent, IRequestDocument} from "@app/core/components/form-document-request";
import {FormSendDocumentService, IFormMainData} from "@app/core/forms/send-document";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";
import {IValuesStep1} from "@app/core/models/send-document";
import {AttachedDocument, RequestedDocument} from "@app/core/models/workflow/workflow.model";
import {FormSubmitDirective} from "@app/public/control-error/directives/form-submit.directive";
import {ControlErrorsDirective} from "@app/public/control-error/directives/control-error.directive";
import {BlockPageComponent, FileUploadComponent} from "@app/core/ui";

@Component({
  selector: 'app-basic-data-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormDocumentRequestComponent,
    FormSubmitDirective, ControlErrorsDirective, FileUploadComponent, BlockPageComponent],
  templateUrl: './general-info-form.component.html',
  styleUrls: ['./general-info-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralInfoFormComponent implements OnChanges, OnInit, OnDestroy {
  @Input() workflows: IWorkflow[] = [];

  @Input() set markAsTouched(value: boolean) {
    if (value) {
      this.submitForm()
    }
  }

  private _subscription = new Subscription();
  public showRequestDocument = false;

  public mainDataForm: FormGroup<IFormMainData>;
  public workflowsData: DropdownModelWF[] = [];

  public requestDocument: IRequestDocument[] = [];
  public requestDocumentRequired: RequestedDocument[] = [];

  public isBlockPage: boolean = false;

  constructor(
    private _formService: FormSendDocumentService,
    private _workflowService: WorkflowService,
    private _messageService: ToastService,
    private _sessionStorageService: SessionStorageService
  ) {
    this.mainDataForm = this._formService.generalInfoForm;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('workflows')) this.setDropdownWorkflow()
  }

  ngOnInit(): void {
    const sendDocumentStep1 = this._sessionStorageService.getItem<IValuesStep1>('send-document-step-1')
    if (sendDocumentStep1) this.mapValuesForm(sendDocumentStep1)
  }

  ngOnDestroy() {
    this._subscription.unsubscribe()
  }

  public submitForm() {
    const form = document.getElementById('my-form')!;
    form.dispatchEvent(new Event('submit'));
  }


  private mapValuesForm(values: IValuesStep1) {
    this.mainDataForm.patchValue({
      title: values.formMainData.title,
      description: values.formMainData.description,
      workflow_id: values.formMainData.workflow_id,
      file: values.formMainData.file,
      attachedDocuments: values.formMainData.attachedDocuments
    }, {emitEvent: false})

    this.requestDocument = values.requestDocument

    this.getAttachedDocumentByWorkflowId(Number.parseInt(values.formMainData.workflow_id))
  }

  private setDropdownWorkflow() {
    this.workflowsData = this.workflows.map((workflow) => ({value: workflow.id.toString(), label: workflow.name}));
  }

  public deleteRequestDocument(position: number): void {
    this.requestDocument = this.requestDocument.filter(value => value.name !== this.requestDocument[position].name);
    this.updateRequestDocuments()
  }

  public addRequestDocument(data: IRequestDocument): void {
    this.requestDocument.push(data);
    this.showRequestDocument = false;

    this.updateRequestDocuments()
  }

  public loadConfigWorkflow(event: any): void {
    const id = event.target.value;
    if (!id) return

    this.getAttachedDocumentByWorkflowId(id);
  }

  private getAttachedDocumentByWorkflowId(workflowID: number): void {
    this.isBlockPage = true;
    this._subscription.add(
      this._workflowService.getAttachedDocument(workflowID).subscribe({
        next: (res) => {
          if (res.error) {
            this.isBlockPage = false;
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
            return
          }

          this.mainDataForm.controls.attachedDocuments.clear()
          this.loadFormAttachedDocuments(res.data || [])

          this.getRequestedDocumentByWorkflowId(workflowID);
        }, error: () => {
          this.isBlockPage = false;
          this.requestDocumentRequired = [];
        }
      })
    );
  }

  private loadFormAttachedDocuments(attachedAnnexes: AttachedDocument[]) {
    for (const annexe of attachedAnnexes) {
      this.createFormAttachedAnnexe(annexe.doctype_name)
    }
  }

  private createFormAttachedAnnexe(annexe: string,) {
    const form = new FormGroup({
      annexe: this._formService.createFormControl(annexe),
      file: this._formService.createFormControl(''),
    })

    this.mainDataForm.controls.attachedDocuments.push(form)
  }

  private getRequestedDocumentByWorkflowId(workflowID: number): void {
    this._subscription.add(
      this._workflowService.getRequestedDocument(workflowID).subscribe({
        next: (res) => {
          this.isBlockPage = false;
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
            return
          }

          if (!res?.data) return;

          this.requestDocumentRequired = res.data;
        },
        error: () => {
          this.isBlockPage = false;
        }

      })
    );
  }


  private updateRequestDocuments(): void {
    this._formService.requestedDocument = this.requestDocument;
  }

  public cancelEvent = () => false
}
