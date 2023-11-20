import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import {VerificationService} from "@app/core/services/verification/verification.service";
import {ToastService} from "@app/public/services/toast/toast.service";
import {Response} from "@app/core/models/global.model";
import * as CryptoJS from 'crypto-js';
import {Subscription} from "rxjs";
import { BlockPageComponent } from '../../../../core/ui/block-page/block-page.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-validate-document',
    templateUrl: './validate-document.component.html',
    styleUrls: ['./validate-document.component.scss'],
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, BlockPageComponent],
  providers: [ToastService]
})
export class ValidateDocumentComponent implements OnDestroy {
  public formValidateDocument: UntypedFormGroup;
  public file64: string;
  public hashFile: string;
  public isBlockPage: boolean;
  public isValid: string = '';
  public accept: string = '.pdf, .jpg, .png';

  public fileName;
  public fileSize;

  private _subscriptions = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _verificationService: VerificationService,
    private _messageService: ToastService,) {
    this.formValidateDocument = this._formBuilder.group(
      {
        name: [{value: '', disabled: true}],
        size: [{value: '', disabled: true,}],
        verification_code: ['', [Validators.required]],
        transaction_id: ['', [Validators.required]],
      }
    )
    this.file64 = '';
    this.isBlockPage = false;
    this.hashFile = '';

    this.fileName = '';
    this.fileSize = '';

  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  public uploadFile(doc: any): void {
    let file = null;
    file = doc.target.files[0];
    this.fileName = '';
    this.fileSize = '';
    if (file) {
      this.fileName = file.name;
      this.fileSize = Number(file.size) > 0 ? ((Number(file.size) / 10485760)).toFixed(3) : '0';
      this.formValidateDocument.get('name')?.setValue(file.name);
      this.formValidateDocument.get('size')?.setValue(file.size);
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
    this.file64 = docToSend.replace(type + ';base64,', '');
    const hash = CryptoJS.SHA256(this.file64);
    this.hashFile = hash.toString(CryptoJS.enc.Hex)
  }

  public submitForm(): void {
    if (this.formValidateDocument?.invalid) {
      this.formValidateDocument.markAllAsTouched();
      this._messageService.add({
        type: 'error',
        message: 'Complete todos los campos correctamente!',
        life: 5000,
      });
      return
    }

    this.validateDocument();
  }

  private validateDocument() {
    /*if (this.formValidateDocument.get('verification_code')?.value === this.hashFile) {
        this.messageToastService.add({
          type: 'success',
          message: 'Los documentos coinciden!',
          life: 5000,
        });
      } else {
        this.messageToastService.add({
          type: 'error',
          message: 'El hash ingresado es incorrecto!',
          life: 5000,
        });
      }
    } else {
      this.messageToastService.add({
        type: 'error',
        message: 'Ingresa el dato requerido!',
        life: 5000,
      });*/

    this.isBlockPage = true;

    const data = {
      "file_encode": this.file64,
      "hash": this.formValidateDocument.get('verification_code')?.value,
      "id_transaction": this.formValidateDocument.get('transaction_id')?.value,
      "block_id": 0
    }

    this._subscriptions.add(
      this._verificationService.validateDataFile(data).subscribe({
        next: (res: Response) => {
          this.isBlockPage = false;
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
            return
          }

          this._messageService.add({
            type: res.type,
            message: res.msg,
            life: 5000,
          });

          this.isValid = res.data;
        },
        error: (err: Error) => {
          this._messageService.add({
            type: 'error',
            message: 'Conexión perdida con el servidor!',
            life: 5000,
          });
          this.isBlockPage = false;
        }
      })
    )
  }

}
