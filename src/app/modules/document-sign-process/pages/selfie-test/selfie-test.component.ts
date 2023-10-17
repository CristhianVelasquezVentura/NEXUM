import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import * as faceApi from "@vladmandic/face-api";
import { Message } from '@app/core/models/toast';
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import { IdentityService } from '@app/core/services/verification/identity.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-selfie-test',
  templateUrl: './selfie-test.component.html',
  styleUrls: ['./selfie-test.component.scss']
})
export class SelfieTestComponent {
  @Output('next-page') nextPage: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('video') videoElement!: ElementRef;


  public imageSrc: string = '';
  public cameraStarted: boolean = false;
  public blockPage: boolean = false;

  constructor(
    private _messageService: ToastService,
    private _identificationService: IdentityService
  ) {
    this.loadModels();
  }

  /**
   * Método que carga los modelos del reconocimiento facial y de emociones desde los assets
   * @private
   */
  private async loadModels() {
    await faceApi.nets.tinyFaceDetector.loadFromUri('../../../../../assets/models');
    await faceApi.nets.faceLandmark68Net.loadFromUri('../../../../../assets/models');
    await faceApi.nets.faceExpressionNet.loadFromUri('../../../../../assets/models');
  }

  /**
   * Método que incia la cámara e incia la prueba de vida
   */
  public async startCamera() {
    this.cameraStarted = true;
    navigator.mediaDevices
      .getUserMedia({video: {}})
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.onplaying = () => {
          this.detectSmile();
        };
      });
  }

  /**
   * Método que obtiene la detección de rostros y emociones y procesa la información para validar la prueba de vida
   * @private
   */
  private async detectSmile() {
    const video = this.videoElement.nativeElement;

    const interval = setInterval(async () => {
      const detection = await faceApi
        .detectSingleFace(video, new faceApi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!detection) return;
      console.log(detection);
      if (detection.expressions.happy < 0.7) return;

      this.captureImage(video);
      const stream: MediaStream = this.videoElement.nativeElement.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      clearInterval(interval);
      return;

    }, 100);
  }

  /**
   * Método que obtiene la foto del usuario cuando se completa la prueba de vida.
   * @param {HTMLVideoElement} video
   * @private
   */
  private captureImage(video: HTMLVideoElement) {
    const canvas = document.createElement('canvas');
    canvas.width = video.width;
    canvas.height = video.height;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    this.imageSrc = canvas.toDataURL('image/png');
  }

  public restartLifeTest(): void {
    this.imageSrc = '';
    this.startCamera();
  }

  public sendValidation(): void {
    this.blockPage = true;
    if(!this.imageSrc) {
      this.blockPage = false;
      this._messageService.add({
        type: 'warning',
        message: 'La validación de identidad es obligatoria',
        life: 5000
      });
      return
    }
    this._identificationService.identityValidation(this.imageSrc).subscribe({
      next: (res) => {
        this._messageService.add({type: res.error ? 'error' : 'success', message: res.msg, life: 5000});
        this.blockPage = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this._messageService.add({
          type: 'error',
          message: 'Ocurrio un error al enviar la solicitud, intente nuevamente.',
          life: 5000
        });
        this.blockPage = false;
      }
    })
    this.nextPage.emit('document-review');
  }
}
