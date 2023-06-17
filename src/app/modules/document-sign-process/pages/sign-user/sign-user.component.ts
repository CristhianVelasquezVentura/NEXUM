import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import SignaturePad from 'signature_pad';
import {TrimCanvas} from "@app/core/utils/functions/canvas";

@Component({
  selector: 'app-sign-user',
  templateUrl: './sign-user.component.html',
  styleUrls: ['./sign-user.component.scss']
})
export class SignUserComponent implements OnInit {
  @ViewChild('canvas', {static: true}) signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private signaturePad!: SignaturePad;

  constructor() {
  }

  ngOnInit(): void {
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement);
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
    console.log(newCanvas.toDataURL('image/png'));
  }

}
