import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ToastService } from '@app/public/services/toast/toast.service';

@Component({
  selector: 'app-document-capture',
  templateUrl: './document-capture.component.html',
  styleUrls: ['./document-capture.component.scss']
})
export class DocumentCaptureComponent {
  @ViewChild('video') videoElement!: ElementRef;
  @Output('on-finish') onFinish: EventEmitter<{ front: string, back: string }> = new EventEmitter<{
    front: string;
    back: string
  }>();
  @Output('on-back') onBack: EventEmitter<boolean> = new EventEmitter<boolean>();
  public imageFrontSrc: string = '';
  public imageBackSrc: string = '';
  public cameraStarted: boolean = false;
  public part: string = '';


  constructor(
    private _toastService: ToastService
  ) {
  }

  /**
   * Método que incia la cámara
   */
  public async startCamera(part: string) {
    this.part = part;
    this.cameraStarted = true;
    navigator.mediaDevices
      .getUserMedia({video: {}})
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
      });
  }

  /**
   * Método que obtiene la foto del documento de identidad
   */
  public captureImage() {
    const canvas = document.createElement('canvas');
    canvas.width = this.videoElement.nativeElement.width;
    canvas.height = this.videoElement.nativeElement.height;
    canvas.getContext('2d')?.drawImage(this.videoElement.nativeElement, 0, 0);
    const stream: MediaStream = this.videoElement.nativeElement.srcObject;
    stream.getTracks().forEach((track) => track.stop());
    this.cameraStarted = false;
    if (this.part === 'front') {
      this.imageFrontSrc = canvas.toDataURL('image/png');
      return;
    }
    this.imageBackSrc = canvas.toDataURL('image/png');
  }

  /**
   * Metodo que finaliza la captura de documentos y emite un evento para continuar con el proceso
   */
  public finishStep(): void {
    if (this.imageFrontSrc === '') {
      this._toastService.add({
        type: 'warning',
        message: "Debe de tomar la foto de la parte frontal del documento de identidad"
      });
      return;
    }
    if (this.imageBackSrc === '') {
      this._toastService.add({
        type: 'warning',
        message: "Debe de tomar la foto de la parte tracera del documento de identidad"
      });
      return;
    }
    this.onFinish.emit({
      back: this.imageBackSrc,
      front: this.imageFrontSrc
    });
  }

  /**
   * Método que envia un evento para retroceder al paso anterior
   */
  public backStep(): void {
    this.onBack.emit(true);
  }
}
