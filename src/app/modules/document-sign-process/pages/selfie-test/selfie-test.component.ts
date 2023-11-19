import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import * as faceApi from "@vladmandic/face-api";
import { Message } from '@app/core/models/toast';
import { ToastService } from '@app/public/services/toast/toast.service';
import { IdentityService } from '@app/core/services/verification/identity.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ValidationUserTest } from '@app/core/models/test-validation';
import { BlockPageComponent } from '../../../../core/ui/block-page/block-page.component';
import { SelfieCaptureComponent } from '../../components/selfie-capture/selfie-capture.component';
import { DocumentCaptureComponent } from '../../components/document-capture/document-capture.component';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { SteperComponent } from '../../components/steper/steper.component';
import { HeaderDocumentSignComponent } from '../../components/header-document-sign/header-document-sign.component';

@Component({
    selector: 'app-selfie-test',
    templateUrl: './selfie-test.component.html',
    styleUrls: ['./selfie-test.component.scss'],
    standalone: true,
    imports: [HeaderDocumentSignComponent, SteperComponent, NgIf, NgSwitch, NgSwitchCase, DocumentCaptureComponent, SelfieCaptureComponent, BlockPageComponent]
})
export class SelfieTestComponent {
  @Output('next-page') nextPage: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('video') videoElement!: ElementRef;


  private _subscriptions: Subscription = new Subscription();
  public component: number = 0;
  public steps: string[] = ['Documento de identidad', 'Prueba de vida', 'finish-success', 'finish-error'];
  private lifeTest: ValidationUserTest = {
    document_back: '',
    document_front: '',
    document_id: '',
    selfie: '',
    signer_id: ''
  };

  public isLoading: boolean = false;
  public blockPage: boolean = false;

  constructor(
    private _messageService: ToastService,
    private _identificationService: IdentityService
  ) {

  }

  public nextStep(): void {
    this.component = 1;
    return;
  }

  /**
   * Méotdo que setea el valor de la sefie (imagen) en el objeto principal a enviar
   * @param {string} selfie
   */
  public setImageSelfie(selfie: string): void {
    this.lifeTest.selfie = selfie;
    this.sendLifeTest();
  }

  /**
   * Méotdo que setea el valor del documento de identidad (frontal y dorsal) en el objeto principal a enviar
   * @param value
   */
  public setIdentityDocument(value: { front: string, back: string }): void {
    this.lifeTest.document_front = value.front;
    this.lifeTest.document_back = value.back;
    debugger
    this.component = 1;
  }

  /**
   * Método que enviar los datos obtenidos a lo largo de la prueba de vida al API para su posterior tratamiento
   * @public
   */
  public sendLifeTest(): void {
    this.isLoading = false;
    const data: ValidationUserTest = {
      document_back: this.lifeTest.document_back.replace('data:image/png;base64,', ''),
      document_front: this.lifeTest.document_front.replace('data:image/png;base64,', ''),
      document_id: this.lifeTest.document_id,
      selfie: this.lifeTest.selfie.replace('data:image/png;base64,', ''),
      signer_id: this.lifeTest.signer_id
    }
    this._subscriptions.add(
      this._identificationService.identityValidation(data).subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg});
            this.component = 4;
            return;
          }
          this.component = 3;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._messageService.add({type: 'error', message: 'No se pudo enviar la prueba de vida, intente nuevamente'});
          return;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    );
  }

  /**
   * Método que permite regresar al paso anterior
   * @param {number} index
   */
  public backStep(index: number): void {
    this.component = index - 1;
  }
}
