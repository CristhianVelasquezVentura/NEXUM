import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {DocInfoStep1, DropdownModelWF, FileEvent} from '@app/core/models/signature.model';
import {ToastService} from '@app/public/services/toast/toast.service';
import {IWorkflow, Annexes} from '@app/modules/workflow/models/steps';
import {WorkflowService} from '@app/modules/workflow/services/workflow.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ToastComponent} from '@app/public/toast/toast.component';
import {HeaderNexumComponent, BlockPageComponent} from '@app/core/ui';
import {NgFor, NgIf} from '@angular/common';
import {GeneralInfoFormComponent} from "@app/modules/send-document/componentes";
import {AttachedDocument, RequestedDocument} from "@app/core/models/workflow/workflow.model";

@Component({
    selector: 'app-general-information',
    templateUrl: './general-information.component.html',
    styleUrls: ['./general-information.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, ReactiveFormsModule, NgFor, NgIf, BlockPageComponent, ToastComponent, GeneralInfoFormComponent],
    providers: [ToastService]
})
export class GeneralInformationComponent implements OnInit, OnDestroy {
    private _subscription = new Subscription();
    public modalAddSolicitude = false;

    public workflows: IWorkflow[] = [];
    public isFileCharged: boolean = false;
    public annexes: Annexes[] = [];
    public annexesWF: Annexes[] = [];

    public attachedDocuments: FileEvent[] = [];
    public requestedDocument: RequestedDocument[] = [];

    private docFile64: string = '';
    public isBlockPage: boolean = false;

    public docMain!: FileEvent;
    public docInfo!: DocInfoStep1;

    public fileToLoad!: File;

    constructor(
        private _messageService: ToastService,
        private _workflowService: WorkflowService,
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

    public saveBasicInformation(): void {
        //if (this.infoGeneralForm.invalid) {
        //    this.infoGeneralForm.markAllAsTouched()
        //    this._messageService.add({
        //        type: 'warning',
        //        message: 'Por favor, llene todos los campos requeridos',
        //        life: 5000
        //    });
        //    return
        //}

        //if (this.docMain) {
        //    this.docInfo = {
        //        title: this.infoGeneralForm.get('title')?.value,
        //        description: this.infoGeneralForm.get('description')?.value,
        //        workflow: this.infoGeneralForm.get('workflow')?.value,
        //        docMain: this.docMain,
        //        attachedDocuments: this.attachedDocuments,
        //        annexes: this.annexes,
        //        requestedDocument: this.requestedDocument
        //    };
        //    sessionStorage.setItem('doc-info-st1', JSON.stringify(this.docInfo));
        //    //this.nextStep(2);
        //} else {
        //    this._messageService.add({
        //        type: 'warning',
        //        message: 'Debe cargar un archivo pdf para continuar!',
        //        life: 5000
        //    });
        //}
    }

    public navigateToRoute(route: string): void {
        this.router.navigateByUrl(route);
    }

    public changeAnnexes(event: boolean, position: number): void {
        this.requestedDocument[position].required = event;
    }

    public nextStep() {
        //if (this.infoGeneralForm.valid) {
        //    this.saveBasicInformation();
        //    this.navigateToRoute('/send-document/document-review');
        //} else {
        //    this._messageService.add({
        //        type: 'warning',
        //        message: 'Complete los datos solicitados',
        //        life: 5000
        //    });
        //}
    }

}
