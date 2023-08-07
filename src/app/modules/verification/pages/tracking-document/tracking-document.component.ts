import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {VerificationService} from "@app/core/services/verification/verification.service";
import {onlyNumbers} from "@app/core/utils/validations/validations";
import {Subscription} from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracking-document',
  templateUrl: './tracking-document.component.html',
  styleUrls: ['./tracking-document.component.scss']
})
export class TrackingDocumentComponent implements OnDestroy, OnInit{

  public urlBjungle = 'http://bjungle.net.s3-website-us-east-1.amazonaws.com/explorer/viewer?info=transaction&id='

  public documentId: string = '';
  public traceability: any[] = [];
  public urlValidationForm: FormGroup;

  public isBlockPage: boolean = false;
  private _subscriptions = new Subscription();

  public typeNotification = 0;

  public isValidateDowndloadFile:boolean = false;
  public urlSelectedFileBlion: string = '';

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
    this.traceability.push({id: 0, document_id: 0, event: 123, transaction_id: '90-184781m-23m234892tm', user: 'James', url_lion: 'https://google.com', created_at: new Date(), updated_at: new Date()});
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

  public startProcessDownload(uri: string): void {
    this.isValidateDowndloadFile = true;
    this.urlSelectedFileBlion = uri;
  }

  public cancelProcessDOwnload(): void {
    this.urlValidationForm.reset();
    this.urlSelectedFileBlion = '';
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
              if(res.data) {
                window.location.href = this.urlSelectedFileBlion;
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
}
