import { Component,EventEmitter,OnDestroy,OnInit,Output } from '@angular/core';
import { Router } from '@angular/router';
import { FileEvent } from '@app/core/models/signature.model';
import { DocumentService } from '@app/core/services/document/document.service';
import { AttachedDocument, RequestedDocument } from '@app/modules/workflow/models/steps';
import { WorkflowService } from '@app/modules/workflow/services/workflow.service';
import { ToastService } from 'ecapture-ng-ui';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attach-documents',
  templateUrl: './attach-documents.component.html',
  styleUrls: ['./attach-documents.component.scss']
})
export class AttachDocumentsComponent implements OnInit, OnDestroy{
  @Output('next-page') nextPage: EventEmitter<string> = new EventEmitter<string>();
  @Output('back-page') backPage: EventEmitter<string> = new EventEmitter<string>();
  private _subscription: Subscription = new Subscription();

  public attachedDocuments: AttachedDocument[] = [];
  public requestedDocument: RequestedDocument[] = [];

  constructor(
    private _messageService: ToastService,
    private _documentService: DocumentService,
    private _router: Router,
    private _workflowService: WorkflowService
  ) {
    const token = sessionStorage.getItem('signature-token');
    if (!token) {
      this._router.navigateByUrl('/sign');
      return;
    }
  }
  ngOnDestroy(): void {

  }
  ngOnInit(): void {

    /*
    type RequestFileAnnexe struct {
      FileEncode string `json:"file_encode"`
      Name       string `json:"name"`
      DocumentId int64  `json:"document_id"`
      UserId     int64  `json:"user_id"`
    }
    */
  }

  private getAttachedDocuments(): void {

  }

  private getRequiredDocuments(): void {

  }

  private getAttachedDocumentByWorkflowId(workflowID: number): void {
    this._subscription.add(
      this._workflowService.getAttachedDocument(workflowID).subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            if (res.data) this.attachedDocuments = res.data;
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
              //this.requestedDocuments = res.data;
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

  public async setAttachedAnnexe(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      // to do asignar al archivo que guarda el objeto {filename, extension,filencode}
      await this.parseBase64(file);
    }
  }

  public async setRequestedAnnexe(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      // to do asignar al archivo que guarda el objeto {filename, extension,filencode}
      await this.parseBase64(file);
    }
  }

  private uploadAttachedAnnexe(): void {
    this._subscription.add(
      this._documentService.uploadAttachedDocument('').subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            if (res.data) {

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

  private uploadRequestedAnnexe(): void {
    this._subscription.add(
      this._documentService.uploadRequestedDocument('').subscribe(
        (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
          } else {
            if (res.data) {

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

  private async parseBase64(file: File): Promise<string> {
    let fileBase64: string = '';
    const reader = new FileReader();
    reader.onload = (e: any) => {
      fileBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
    console.log(fileBase64);
    return fileBase64;
  }

}