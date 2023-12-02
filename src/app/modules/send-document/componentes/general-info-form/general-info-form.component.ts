import {Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {IWorkflow} from "@app/modules/workflow/models/steps";
import {DocInfoStep1, DropdownModelWF, FileEvent} from "@app/core/models/signature.model";
import {ToastService} from "@app/public/services/toast/toast.service";
import {WorkflowService} from "@app/modules/workflow/services/workflow.service";
import {Router} from "@angular/router";
import {FilesService} from "@app/core/services/file/file.service";
import {FormDocumentRequestComponent, IDocumentRequest} from "@app/core/components/form-document-request";
import {FormSendDocumentService, IFormMainData} from "@app/core/forms/send-document";
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";
import {AttachedDocumentData, IDocumentFiles, IValuesStep1} from "@app/core/models/send-document";
import {AttachedDocument, RequestedDocument} from "@app/core/models/workflow/workflow.model";

@Component({
    selector: 'app-basic-data-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormDocumentRequestComponent],
    templateUrl: './general-info-form.component.html',
    styleUrls: ['./general-info-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GeneralInfoFormComponent implements OnChanges {
    @Input() workflows: IWorkflow[] = [];

    private _subscription = new Subscription();
    public modalAddSolicitude = false;

    public mainDataForm: FormGroup<IFormMainData>;
    public workflowsData: DropdownModelWF[] = [];
    public isFileCharged: boolean = false;
    public annexes: IDocumentRequest[] = [];

    public attachedDocument: AttachedDocumentData[] = [];
    public requestedDocument: RequestedDocument[] = [];
    public documentFiles: IDocumentFiles[] = [];

    private docFile64: string = '';
    private anxexeFile64: string = '';
    private hashFileDoc: string = '';
    private hashFileAnnexe: string = '';
    public isBlockPage: boolean = false;

    public docMain!: FileEvent;
    public docInfo!: DocInfoStep1;

    public fileToLoad!: File;

    constructor(
        private _formService: FormSendDocumentService,
        private _workflowService: WorkflowService,
        private _messageService: ToastService,
        private _filesService: FilesService,
        private _sessionStorageService: SessionStorageService,
        private router: Router
    ) {
        this.mainDataForm = this._formService.generalInfoForm;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setDropdownWorkflow()
    }

    ngOnInit(): void {


        const sendDocumentStep1 = this._sessionStorageService.getItem<IValuesStep1>('send-document-step-1')
        if (sendDocumentStep1) this.mapValuesForm(sendDocumentStep1)

        let localDataInfo = JSON.parse(<string>sessionStorage.getItem('doc-info-st1'));
        if (localDataInfo) {
            this.mainDataForm.patchValue({
                workflow_id: localDataInfo.workflow,
                title: localDataInfo.title,
                description: localDataInfo.description,
            });
            this.docMain = localDataInfo.docMain;
            //this.attachedDocuments = localDataInfo.attachedDocuments;
            this.annexes = localDataInfo.annexes;
            this.requestedDocument = localDataInfo.requestedDocument;
            return
        }

        this.docInfo = {
            title: '',
            description: '',
            workflow: '',
            docMain: '',
            attachedDocuments: [],
            annexes: [],
            requestedDocument: []
        };
    }

    private mapValuesForm(values: IValuesStep1){

    }

    get hasMainFile() {
        return !this.documentFiles.find(doc => doc.file_id === 1)
    }

    get hasAttachedDocument() {
        return !this.documentFiles.find(doc => doc.file_id === 2)
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    private setDropdownWorkflow() {
        this.workflowsData = this.workflows.map((workflow) => ({value: workflow.id.toString(), label: workflow.name}));
    }

    public deleteAnnexe(position: number): void {
        this.annexes = this.annexes.filter(value => value.name !== this.annexes[position].name);
    }

    public addRequestAnnexe(data: IDocumentRequest): void {
        this.annexes.push(data);
        this.modalAddSolicitude = false;
    }

    public loadConfigWorkflow(event: any): void {
        const id = event.target.value;
        if (!id) return

        this.requestedDocument = [];
        this.attachedDocument = [];
        this.getAttachedDocumentByWorkflowId(id);
        this.getRequestedDocumentByWorkflowId(id);
    }

    private getAttachedDocumentByWorkflowId(workflowID: number): void {
        this._subscription.add(
            this._workflowService.getAttachedDocument(workflowID).subscribe({
                next: (res) => {
                    if (res.error) {
                        this._messageService.add({type: 'error', message: res.msg, life: 5000});
                        return
                    }

                    //this.attachedDocument = res.data || [];
                }, error: (err: Error) => {
                    console.error(err.message);
                }
            })
        );
    }

    private getRequestedDocumentByWorkflowId(workflowID: number): void {
        this._subscription.add(
            this._workflowService.getRequestedDocument(workflowID).subscribe({
                next: (res) => {
                    if (res.error) {
                        this._messageService.add({type: 'error', message: res.msg, life: 5000});
                        return
                    }

                    if(!res?.data) return;

                    this.requestedDocument = res.data;
                },
                error: (err: Error) => {
                    console.error(err.message);
                }

            })
        );
    }

    public setAttachment(event: Event, position: number): void {
        const target = event.target as HTMLInputElement
        if (target.files === null) return

        const file: File = target.files[0];
        this._filesService.readFileBase64(file).subscribe({
            next: (base64) => this.chargeAttachmentFile(file, base64, position)
        })
    }

    private chargeAttachmentFile(file: File, base64: string, position: number) {
        this.documentFiles.push(
            {
                file_name: file.name,
                encoding: base64,
                file_id: 2
            }
        )
    }

    public uploadMainFile(event: any): void {
        const target = event.target as HTMLInputElement
        if (target.files === null) return

        const file: File = target.files[0];
        this._filesService.readFileBase64(file).subscribe({
            next: (base64) => this.chargeMainFile(file, base64)
        })
    }

    private chargeMainFile(file: File, base64: string) {
        this.documentFiles.push(
            {
                file_name: file.name,
                encoding: base64,
                file_id: 1
            }
        )
    }

    public cancelEvent(evt: Event){
        return false
    }
}
