import {Component, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {Subscription} from "rxjs";
import {GetExtensionOfBase64, GetTokenUser} from "@app/core/utils/validations/validations";
import {HttpErrorResponse} from "@angular/common/http";
import {DocumentService} from "@app/core/services/document/document.service";
import {FileAnnexe} from "@app/core/models/document";
import {Router} from "@angular/router";
import {ToastService} from "ecapture-ng-ui";

@Component({
  selector: 'app-review-document',
  templateUrl: './review-document.component.html',
  styleUrls: ['./review-document.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class ReviewDocumentComponent implements OnInit {

  public typeDoc: string = 'document';
  public document: any;
  public signer: any;

  private _subscription: Subscription = new Subscription();
  // public readonly toastStyle: ToastStyleModel = toastDataStyle;
  public documentsAnnexes: FileAnnexe[] = [];

  public blockPage: boolean = false;
  public mainDocument!: FileAnnexe;
  public indexAnnexeSelected: number = 0;

  constructor(
    private _messageService: ToastService,
    private _documentService: DocumentService,
    private _router: Router
  ) {
    const token = sessionStorage.getItem('signature-token');
    /*if (!token) {
      this._router.navigateByUrl('');
      this._messageService.add({type: 'error', message: 'No esta autorizado para firmar este documento!', life: 5000});
      return;
    }*/

    this.signer = GetTokenUser(token || '');
    if (!this.signer || !this.signer.document) return;
    sessionStorage.setItem('signer', JSON.stringify(this.signer));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    /*this.blockPage = true;
    this._subscription.add(
      this._documentService.getFilesByDocumentID(this.signer.document).subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg, life: 5000});
            this.blockPage = false;
            return;
          }

          if (!res.data || !res.data.length) {
            this._messageService.add({
              type: 'warning',
              message: 'No se encontraron documentos relacionados',
              life: 5000
            });
            this.blockPage = false;
          }

          for (const document of res.data) {
            if (document.file_id === 1) {
              document.type = GetExtensionOfBase64(document.encoding);
              this.mainDocument = document;
            }

            document.active = false;
            document.type = GetExtensionOfBase64(document.encoding);
            this.documentsAnnexes.push(document);
          }
          /!*if (!this.endOtp && !this.existOtp) {
            this.generateCodeOTP();
            this.isOtpGenerated.emit(true);
          }*!/
          this.blockPage = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.blockPage = false;
          this._messageService.add({
            type: 'error',
            message: 'No se pudo obtener los archivos relacionados al documento, intente nuevamente!',
            life: 5000
          });
        }
      })
    );*/
  }

  public getExtension(file: string): string {
    return GetExtensionOfBase64(file);
  }

}
