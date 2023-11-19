import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from "@app/public/services/toast/toast.service";
import {VerificationService} from "@app/core/services/verification/verification.service";
import {onlyNumbers} from "@app/core/utils/validations/validations";
import {Subscription} from "rxjs";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Trazabilidad } from '@app/core/models/traza.model';
import { BlockPageComponent } from '../../../../core/ui/block-page/block-page.component';
import { NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
    selector: 'app-tracking-document',
    templateUrl: './tracking-document.component.html',
    styleUrls: ['./tracking-document.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, BlockPageComponent, DatePipe]
})
export class TrackingDocumentComponent implements OnDestroy, OnInit{

  public urlBjungle = 'http://bjungle.net.s3-website-us-east-1.amazonaws.com/explorer/viewer?info=transaction&id='

  public documentId: string = '';
  public traceability: Trazabilidad[] = [];
  public urlValidationForm: FormGroup;

  public isBlockPage: boolean = false;
  private _subscriptions = new Subscription();

  public typeNotification = 0;

  public isValidateDowndloadFile:boolean = false;
  public documentSelectedToDownload: number = 0;

  constructor(
    private _verificationService: VerificationService,
    private _messageService: ToastService,
    private _fb: FormBuilder,
  ) {
    this.urlValidationForm = _fb.group({
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    //this.traceability.push({id: 0, document_id: 0, event: 123, transaction_id: '90-184781m-23m234892tm', id_user: 'axaxax', url_lion: 'https://google.com', created_at: '2023-08-07', updated_at: '2023-08-07'});
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  public getTrackingDocument(): void {
    if (!this.documentId) {
      this._messageService.add({type: 'warning', message: 'Ingrese el ID del Documento', life: 5000});
      return
    }

    this.isBlockPage = true;
    this.traceability = [];
    this.typeNotification = 0;
    this._subscriptions.add(
      this._verificationService.getTrackingDocument(Number(this.documentId)).subscribe({
          next: (res) => {
            this.isBlockPage = false;
            if (res.error) {
              this._messageService.add({type: 'error', message: res.msg, life: 5000});
              this.typeNotification = 1;
              return
            }

            if (res.data === null || res.data.length === 0) {
              this._messageService.add({type: 'warning', message: 'Este documento no existe o no tiene trazabilidad', life: 5000});
              this.typeNotification = 2;
              return
            }

            this.typeNotification = 0;
            this.traceability = res.data?.map((tc: any) => ({...tc, active: false}));
          },
          error: (err: Error) => {
            this.isBlockPage = false;
            this.typeNotification = 1;
            this._messageService.add({
              type: 'error',
              message: 'Conexión perdida, intente de nuevo y revise su conexión a internet!',
              life: 5000
            });
          }
        }
      )
    );
  }

  public onlyNumbers = (value: KeyboardEvent) => onlyNumbers(value);

  public deleteNotification() {
    this.typeNotification = 0;
  }

  public startProcessDownload(document: number): void {
    this.isValidateDowndloadFile = true;
    this.documentSelectedToDownload = document;
  }

  public cancelProcessDOwnload(): void {
    this.urlValidationForm.reset();
    this.documentSelectedToDownload = 0;
  }

  public validateDownloadDocument(): void {
    this.isBlockPage = true;
    const formValue = this.urlValidationForm.value;
    if(this.urlValidationForm.valid) {
      this._subscriptions.add(
        this._verificationService.validateDownloadFile(Number(this.documentId), formValue.password).subscribe({
            next: (res) => {
              this.isBlockPage = false;
              if (res.error) {
                this._messageService.add({type: 'error', message: res.msg, life: 5000});
                //this.typeNotification = 1;
                return
              }

              //this.typeNotification = 0;

              if(!res.data) {
                this._messageService.add({type:'warning',message:'No se encontró un archivo con la información proporcionada', life: 5000});
                return
              }

              if(res.data) {
                const data = res.data;
                //const extension = res.data.split(';')[0].split('/')[1];
                this.downloadPDFFromBase64(data.file_encode, data.filename + data.extension);
                return
              }
            },
            error: (err: Error) => {
              this.isBlockPage = false;
              //this.typeNotification = 1;
              this._messageService.add({
                type: 'error',
                message: 'Conexión perdida, intente de nuevo y revise su conexión a internet!',
                life: 5000
              });
            }
          }
        )
      );
    } else {
      this.isBlockPage = false;
      this.urlValidationForm.markAllAsTouched();
    }

  }

  //Método que descarga el PDF desde una cadena base64
  private downloadPDFFromBase64(base64Data: string, filename: string) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Liberar el objeto URL después de la descarga
    URL.revokeObjectURL(url);
  }

}
