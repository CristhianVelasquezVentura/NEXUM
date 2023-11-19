import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import * as faceApi from "@vladmandic/face-api";
import { ToastService } from '@app/public/services/toast/toast.service';
import { IdentityService } from '@app/core/services/verification/identity.service';

@Component({
  selector: 'app-selfie-capture',
  templateUrl: './selfie-capture.component.html',
  styleUrls: ['./selfie-capture.component.scss']
})
export class SelfieCaptureComponent {
  @ViewChild('video') videoElement!: ElementRef;
  @Output('on-back') onBack: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('on-finish') onFinish: EventEmitter<string> = new EventEmitter<string>();

  public imageSrc: string = '';
  public cameraStarted: boolean = false;

  constructor(
    private _toastService: ToastService
  ) {
    this.loadModels();
  }
  /**
   * Método que carga los modelos del reconocimiento facial y de emociones desde los assets
   * @private
   */
  private async loadModels() {
    await faceApi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    await faceApi.nets.faceLandmark68Net.loadFromUri('/assets/models');
    await faceApi.nets.faceExpressionNet.loadFromUri('/assets/models');
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

  /**
   * Método que reinicia o permite volver a inciar la prueba de vida
   */
  public restartLifeTest(): void {
    this.imageSrc = '';
    this.startCamera();
  }

  /**
   * Método que finaliza la validación de identidad y emite un evento enviando la foto de la selfie obtenida
   */
  public finishedLifeTest(): void {
    if (!this.imageSrc) {
      this._toastService.add({type: 'warning', message: 'Debe de realizar la prueba de vida'});
      return;
    }
    this.onFinish.emit(this.imageSrc);
  }

  /**
   * Método que emite un evento para poder retroceder al paso anterior (Documento de identidad)
   */
  public backStep(): void {
    this.onBack.emit(true);
  }
}
