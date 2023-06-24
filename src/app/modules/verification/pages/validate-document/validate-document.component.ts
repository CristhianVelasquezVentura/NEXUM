import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VerificationService} from "@app/core/services/verification/verification.service";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {Response} from "@app/core/models/global.model";
import * as CryptoJS  from 'crypto-js';

@Component({
  selector: 'app-validate-document',
  templateUrl: './validate-document.component.html',
  styleUrls: ['./validate-document.component.scss']
})
export class ValidateDocumentComponent implements OnInit {
  public formValidateDocument: FormGroup ;
  public file64: string;
  public hashFile: string;
  public isActiveLoad: boolean;
  public optionTabName: string = 'Validation'

  constructor(private _formBuilder: FormBuilder, private _verificationService: VerificationService, private messageToastService: ToastService,) {
    this.formValidateDocument = this._formBuilder.group(
      {
        name: [{value: '', disabled: false}, [Validators.required]],
        size: [{value: '', disabled: false}, [Validators.required]],
        file_extension: [{value: '', disabled: false}, [Validators.required]],
        verification_code: [{value: '', disabled: false}, [Validators.required]],
        transaction_id: [{value: '', disabled: false}, [Validators.required]],
      }
    )
    this.file64 = '';
    this.isActiveLoad = false;
    this.hashFile = '';
  }

  ngOnInit(): void {
  }

  uploadFile(doc: any): void {
    let file = null;
    file = doc.target.files[0];
    this.formValidateDocument.get('name')?.setValue(file.name);
    this.formValidateDocument.get('size')?.setValue(file.size);
    this.validateType(file.type);
    this.getBase64(file);
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



  validateType(type: string) {
    if (type === 'application/pdf') {
      this.formValidateDocument.get('file_extension')?.setValue('.pdf')
    }
    if (type === 'image/png') {
      this.formValidateDocument.get('file_extension')?.setValue('.png')
    }
  }

  public sendData(): void {
    if (this.formValidateDocument?.valid) {
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

      this.isActiveLoad = true;

      const data = {
        "file_encode": this.file64,
        "hash": this.formValidateDocument.get('verification_code')?.value,
        "id_transaction": this.formValidateDocument.get('transaction_id')?.value,
        "block_id": 0
      }

      this._verificationService.validateDataFile(data).subscribe({
        next: (res: Response) => {
          this.messageToastService.add({
            type: res.type,
            message: res.msg,
            life: 5000,
          });
          this.isActiveLoad = false;
        },
        error: (err: Error) => {
          this.messageToastService.add({
            type: 'error',
            message: 'Conexión perdida con el servidor!',
            life: 5000,
          });
          this.isActiveLoad = false;
        }
      })

    }else {
      this.messageToastService.add({
        type: 'error',
        message: 'Complete todos los campos correctamente!',
        life: 5000,
      });
      this.isActiveLoad = false;
    }
  }

}
