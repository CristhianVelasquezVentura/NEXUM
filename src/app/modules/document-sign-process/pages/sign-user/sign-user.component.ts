import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import SignaturePad, {PointGroup} from 'signature_pad';
import {TrimCanvas} from "@app/core/utils/functions/canvas";
import {UserAgent} from "@app/core/utils/functions/userAnget";

@Component({
  selector: 'app-sign-user',
  templateUrl: './sign-user.component.html',
  styleUrls: ['./sign-user.component.scss']
})
export class SignUserComponent implements OnInit {
  @ViewChild('canvas', {static: true}) signatureCanvas!: ElementRef<HTMLCanvasElement>;
  @Output('export-sign') exportSignature: EventEmitter<string> = new EventEmitter<string>();
  @Output('back-page') backPage: EventEmitter<string> = new EventEmitter<string>();
  private signaturePad!: SignaturePad;

  constructor() {
  }

  ngOnInit(): void {
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement);
    this.adjustCanvasSize();
  }

  /**
   * Método que verifica si el tamaño de la ventana ha cambiado
   * @private
   */
  @HostListener('window:resize')
  private onWindowResize(): void {
    this.adjustCanvasSize();
  }

  /**
   * Método que permite ajustar el tamaño del liezo dependiendo del dispositivo y del tamaño de la pantalla
   * @private
   */
  private adjustCanvasSize(): void {
    this.signatureCanvas.nativeElement.width = 800;
    this.signatureCanvas.nativeElement.height = 400;
    const isMobile = UserAgent.IsMobileDevice();
    if (isMobile || window.innerWidth < 920) this.signatureCanvas.nativeElement.width = 500;

    let existingSignature: PointGroup[] = [];
    if (this.signaturePad) existingSignature = this.signaturePad.toData();
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement);
    if (!existingSignature.length) return;
    this.signaturePad.clear();
    this.signaturePad.fromData(existingSignature);

  }

  /**
   * Método que permite reintentar la firma (limpia el lienzo)
   */
  public retry(): void {
    this.signaturePad.clear();
  }

  /**
   * Método que permite guardar la rubrica de la firma y exportarlo en formato PNG
   */
  public saveImage(): void {
    const newCanvas: HTMLCanvasElement = TrimCanvas(this.signatureCanvas.nativeElement);
    this.exportSignature.emit(newCanvas.toDataURL('image/png'));
  }

}
