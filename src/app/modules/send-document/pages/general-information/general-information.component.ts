import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {DocInfoStep1, DropdownModelWF, FileEvent} from '@app/core/models/signature.model';
import {ToastService} from '@app/public/services/toast/toast.service';
import {IWorkflow, Annexes, RequestedDocument, AttachedDocument} from '@app/modules/workflow/models/steps';
import {WorkflowService} from '@app/modules/workflow/services/workflow.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ToastComponent} from '@app/public/toast/toast.component';
import {HeaderNexumComponent, BlockPageComponent} from '@app/core/ui';
import {NgFor, NgIf} from '@angular/common';
import {BasicDataFormComponent} from "@app/modules/send-document/componentes";

@Component({
    selector: 'app-general-information',
    templateUrl: './general-information.component.html',
    styleUrls: ['./general-information.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, ReactiveFormsModule, NgFor, NgIf, BlockPageComponent, ToastComponent, BasicDataFormComponent],
    providers: [ToastService]
})
export class GeneralInformationComponent implements OnInit, OnDestroy {
    private _subscription = new Subscription();
    public modalAddSolicitude = false;

    public infoGeneralForm: FormGroup;
    public annexesForm: FormGroup;
    public workflows: IWorkflow[] = [];
    public isFileCharged: boolean = false;
    public annexes: Annexes[] = [];
    public annexesWF: Annexes[] = [];

    public attachedDocument: AttachedDocument[] = [];
    public attachedDocuments: FileEvent[] = [];
    public requestedDocument: RequestedDocument[] = [];

    private docFile64: string = '';
    private anxexeFile64: string = '';
    private hashFileDoc: string = '';
    private hashFileAnnexe: string = '';
    public isBlockPage: boolean = false;

    public docMain!: FileEvent;
    public docInfo!: DocInfoStep1;

    public fileToLoad!: File;

    constructor(
        private _fb: FormBuilder,
        private _messageService: ToastService,
        private _workflowService: WorkflowService,
        private router: Router
    ) {
        this.infoGeneralForm = _fb.group({
            workflow: ['', Validators.required],
            tittle: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
        });
        this.annexesForm = _fb.group({
            name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
            requiredAnnexe: [false]
        });
    }

    ngOnInit(): void {
        this.getWorkflows();
        let localDataInfo = JSON.parse(<string>sessionStorage.getItem('doc-info-st1'));
        if (localDataInfo) {
            this.infoGeneralForm.patchValue({
                workflow: localDataInfo.workflow,
                title: localDataInfo.title,
                description: localDataInfo.description,
            });
            this.docMain = localDataInfo.docMain;
            this.attachedDocuments = localDataInfo.attachedDocuments;
            this.annexes = localDataInfo.annexes;
            this.requestedDocument = localDataInfo.requestedDocument;
        } else {
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
        this.annexesWF.push({name: 'Libreta Militar', isRequired: false});
        this.annexesWF.push({name: 'Cédula Ciudadanía', isRequired: false});
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

    public uploadFile(event: any) {
        debugger
        this.isFileCharged = true;
        let file = null;
        file = event.target.files[0];
        if (file) {
            this.getBase64(file);
        }
    }

    private getBase64(file: File) {
        const reader: any = new FileReader();
        reader.onloadend = this._handleReaderLoaded.bind(this);
        reader.onerror = function (error: any) {
            console.log('Error ' + error);
        };
        reader.readAsDataURL(file);
    }

    private _handleReaderLoaded(e: any) {
        // @ts-ignore
        const docToSend = e.target.result;
        const type = docToSend.split(';')[0];
        this.docMain = docToSend.replace(type + ';base64,', '');
        const hash = CryptoJS.SHA256(this.docFile64);
        this.hashFileDoc = hash.toString(CryptoJS.enc.Hex)
    }

    public deleteAnnexe(position: number): void {
        this.annexes = this.annexes.filter(value => value.name !== this.annexes[position].name);
    }

    public saveBasicInformation(): void {
        if (this.infoGeneralForm.valid) {
            if (this.docMain) {
                this.docInfo = {
                    title: this.infoGeneralForm.get('title')?.value,
                    description: this.infoGeneralForm.get('description')?.value,
                    workflow: this.infoGeneralForm.get('workflow')?.value,
                    docMain: this.docMain,
                    attachedDocuments: this.attachedDocuments,
                    annexes: this.annexes,
                    requestedDocument: this.requestedDocument
                };
                sessionStorage.setItem('doc-info-st1', JSON.stringify(this.docInfo));
                //this.nextStep(2);
            } else {
                this._messageService.add({
                    type: 'warning',
                    message: 'Debe cargar un archivo pdf para continuar!',
                    life: 5000
                });
            }
        } else {
            this._messageService.add({
                type: 'warning',
                message: 'Por favor, llene todos los campos requeridos',
                life: 5000
            });
        }
    }

    public navigateToRoute(route: string): void {
        this.router.navigateByUrl(route);
    }

    public changeAnnexes(event: boolean, position: number): void {
        this.requestedDocument[position].required = event;
    }

    public nextStep() {
        if (this.infoGeneralForm.valid) {
            this.saveBasicInformation();
            this.navigateToRoute('/send-document/document-review');
        } else {
            this._messageService.add({
                type: 'warning',
                message: 'Complete los datos solicitados',
                life: 5000
            });
        }
    }

}
