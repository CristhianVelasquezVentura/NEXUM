import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {VerificationService} from "@app/core/services/verification/verification.service";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {Response} from "@app/core/models/global.model";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-validate-document',
  templateUrl: './validate-document.component.html',
  styleUrls: ['./validate-document.component.scss']
})
export class ValidateDocumentComponent implements OnInit {
  public formValidateDocument: UntypedFormGroup;
  public file64: string;
  public hashFile: string;
  public isActiveLoad: boolean;
  public optionTabName: string = 'Validation'
  public isValid: string = '';
  public accept: string = '.pdf, .png';

  public fileName;
  public fileSize;

  constructor(
    private _formBuilder: FormBuilder,
    private _verificationService: VerificationService,
    private _messageToastService: ToastService,) {
    this.formValidateDocument = this._formBuilder.group(
      {
        name: [{value: '', disabled: true}],
        size: [{value: '', disabled: true,}],
        file_extension: [{value: '', disabled: true},],
        verification_code: ['', [Validators.required]],
        transaction_id: ['', [Validators.required]],
      }
    )
    this.file64 = '';
    this.isActiveLoad = false;
    this.hashFile = '';

    this.fileName = '';
    this.fileSize = '';

  }

  ngOnInit(): void {
  }

  public uploadFile(doc: any): void {
    let file = null;
    file = doc.target.files[0];
    this.fileName = '';
    this.fileSize = '';
    if(file) {
      this.fileName = file.name;
      this.fileSize = Number(file.size) > 0? ((Number(file.size)/10485760)).toFixed(3):'0' ;
      this.formValidateDocument.get('name')?.setValue(file.name);
      this.formValidateDocument.get('size')?.setValue(file.size);
      this.formValidateDocument.get('file_extension')?.setValue(file.extension);
      this.validateType(file.type);
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


  private validateType(type: string) {
    if (type === 'application/pdf') {
      this.formValidateDocument.get('file_extension')?.setValue('.pdf')
    }
    if (type === 'image/png') {
      this.formValidateDocument.get('file_extension')?.setValue('.png')
    }
  }

  public submitForm(): void {
    if (this.formValidateDocument?.invalid) {
      this.formValidateDocument.markAllAsTouched();
      this._messageToastService.add({
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

    this.isActiveLoad = true;

    const data = {
      "file_encode": this.file64,
      "hash": this.formValidateDocument.get('verification_code')?.value,
      "id_transaction": this.formValidateDocument.get('transaction_id')?.value,
      "block_id": 0
    }

    this._verificationService.validateDataFile(data).subscribe({
      next: (res: Response) => {
        this._messageToastService.add({
          type: res.type,
          message: res.msg,
          life: 5000,
        });
        this.isActiveLoad = false;
        this.isValid = res.data;
      },
      error: (err: Error) => {
        this._messageToastService.add({
          type: 'error',
          message: 'Conexión perdida con el servidor!',
          life: 5000,
        });
        this.isActiveLoad = false;
      }
    })
  }

}
