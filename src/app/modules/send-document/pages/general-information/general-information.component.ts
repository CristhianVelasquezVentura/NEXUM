import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocInfoStep1, DropdownModelWF, FileEvent} from '@app/core/models/signature.model';
import { ToastService } from '@app/public/services/toast/toast.service';
import { Workflow, Annexes, RequestedDocument, AttachedDocument } from '@app/modules/workflow/models/steps';
import { WorkflowService } from '@app/modules/workflow/services/workflow.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  public modalAddSolicitude = false;

  public infoGeneralForm: FormGroup;
  public annexesForm: FormGroup;
  public workflows: Workflow[] = [];
  public workflowsData: DropdownModelWF[] = [];
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
    this.GetWorkflows();
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

  private CreateDropWorkflow() {
    let workflowsDataTemp: DropdownModelWF[] = [];
    this.workflows.forEach(function (workflow) {
      workflowsDataTemp.push({value: workflow.id.toString(), label: workflow.name});
    });
    this.workflowsData = workflowsDataTemp;
  }

  public GetWorkflows() {
    this._subscription.add(
      this._workflowService.getWorkflows().subscribe({
        next: (response) => {
          if (response.error) {
            this._messageService.add({
              type: 'error',
              message: response.msg,
              life: 5000
            });
          } else {
            if (response.data) {
              this.workflows = response.data;
              this.CreateDropWorkflow();
            }
          }
        },error:
        (error: Error) => {
          console.error(error.message);
          this._messageService.add({
            type: 'error',
            message: 'Conexión perdida con el servidor, verifique su conexión de internet o contactese con el administrador!',
            life: 5000
          });
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

  public addAnnex(): void {
    debugger
    if (this.annexesForm.valid) {
      this.annexes.push({name: this.annexesForm.get('name')?.value, isRequired: this.annexesForm.get('requiredAnnexe')?.value});
      this.modalAddSolicitude = false;
      this.annexesForm.reset();
    } else {
      this._messageService.add({type: 'warning', message: 'Complete todos los campos correctamente!', life: 5000})
    }
  }

  public loadConfigWorkflow(event: any): void {
    const id = event.target.value;
    if (id) {
      this.requestedDocument = [];
      this.attachedDocument = [];
      this.getAttachedDocumentByWorkflowId(id);
      this.getRequestedDocumentByWorkflowId(id);
    }
  }

  private getAttachedDocumentByWorkflowId(workflowID: number): void {
    this._subscription.add(
      this._workflowService.getAttachedDocument(workflowID).subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            if (res.data) this.attachedDocument = res.data;
          }
        },
        (err: Error) => {
          console.error(err.message);
          this._messageService.add({
            type: 'error',
            message: 'Conexión perdida con el servidor, verifique su conexión de internet!',
            life: 5000
          });
        }
      )
    );
  }

  private getRequestedDocumentByWorkflowId(workflowID: number): void {
    this._subscription.add(
      this._workflowService.getRequestedDocument(workflowID).subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            if (res.data) {
              this.requestedDocument = res.data;
            }
          }
        },
        (err: Error) => {
          console.error(err.message);
          this._messageService.add({
            type: 'error',
            message: 'Conexión perdida con el servidor, verifique su conexión de internet!',
            life: 5000
          });
        }
      )
    );
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

  public setAttachment(event: any, position: number): void {
    const file: File = event.target.files[0];
    let _event = {
      name: '',
      value: '',
      extension: ''
    };
    this.docFile64 = this.parseBase64(file);
    if(file.name) {
      _event.name = file.name;
      _event.extension = file.name.split('.').pop()||'';
      _event.value = this.docFile64;
    }
    this.docFile64 = '';
    this.attachedDocuments[position] = _event;
  }

  public uploadMainFile(event: any): void {
    const file: File = event.target.files[0];
    let _event = {
      name: '',
      value: '',
      extension: ''
    };
    this.docFile64 = this.parseBase64(file);
    if(file.name) {
      _event.name = file.name;
      _event.extension = file.name.split('.').pop()||'';
      _event.value = this.docFile64;
    }
    this.docMain = _event;
    this.docFile64 = '';
  }

  public changeAnnexes(event: boolean, position: number): void {
    this.requestedDocument[position].required = event;
  }

  public nextStep() {
    if(this.infoGeneralForm.valid) {
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

  parseBase64(file: File): string {
      let fileBase64: string = '';
      const reader = new FileReader();
      reader.onload = (e: any) => {
        fileBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
    return fileBase64;
  }
}
