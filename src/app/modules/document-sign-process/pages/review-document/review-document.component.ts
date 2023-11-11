import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {Subscription} from "rxjs";
import {GetExtensionOfBase64, GetMimeTypeOfBase64, GetTokenUser} from "@app/core/utils/validations/validations";
import {DocumentService} from "@app/core/services/document/document.service";
import {FileAnnexe} from "@app/core/models/document";
import {Router} from "@angular/router";
import {ToastService} from "@app/public/services/toast/toast.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Token} from "@app/core/models/token";

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
export class ReviewDocumentComponent implements OnInit, OnDestroy {

  @Output('next-page') nextPage: EventEmitter<string> = new EventEmitter<string>();
  @Output('back-page') backPage: EventEmitter<string> = new EventEmitter<string>();
  private _subscription: Subscription = new Subscription();
  public documentsAnnexes: FileAnnexe[] = [];
  public mainDocument!: FileAnnexe;
  public showAnnexe!: FileAnnexe;
  public indexAnnexeSelected: number = 0;
  public typeDoc: string = 'document';
  public blockPage: boolean = false;
  public tokenData!: Token;

  constructor(
    private _messageService: ToastService,
    private _documentService: DocumentService,
    private _router: Router
  ) {
    const token = sessionStorage.getItem('signature-token');
    if (!token) {
      this._router.navigateByUrl('/sign');
      return;
    }

    this.tokenData = GetTokenUser(token);
    if (!this.tokenData || !this.tokenData.document) return;
    sessionStorage.setItem('signer', JSON.stringify(this.tokenData));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllFiles();
  }

  /**
   * Método que permite traer todos los archivos relacionados (Archivo principal - anexos) a la firma
   * @private
   */
  private getAllFiles(): void {
    this.blockPage = true;
    this._subscription.add(
      this._documentService.getFilesByDocumentID(this.tokenData.document).subscribe({
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
                continue;
              }

              document.active = false;
              document.type = GetExtensionOfBase64(document.encoding);
              this.documentsAnnexes.push(document);
            }

            if (this.documentsAnnexes.length) this.showAnnexe = this.documentsAnnexes[0];

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
        }
      )
    );
  }

  /**
   * Método que permite obtener el MimeType de un archivo en base64
   * @param file - Base64 del archivo
   */
  public getMimeTypeofB64(file: string): string {
    return GetMimeTypeOfBase64(file);
  }

  /**
   * Método qué permite cambiar el visor entre el documento principal o los anexos
   * @param file - permite identificar entre el anexo y el documento principal
   */
  public selectMainOrAnnexe(file: string): void {
    if (this.typeDoc === file) return;

    if (file == 'document') {
      this.typeDoc = file;
      return;
    }

    this.typeDoc = 'annexes';
    if (this.documentsAnnexes.length) this.showAnnexe = this.documentsAnnexes[0];

  }

  protected readonly transition = transition;
}
