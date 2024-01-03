import {Component, inject, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import { HeaderNexumComponent } from '@app/core/ui';
import {SessionStorageService} from "@app/core/services/storage/session-storage.service";
import {IValuesStep1} from "@app/core/models/send-document";
import {PdfViewerComponent} from "@app/core/ui";

@Component({
    selector: 'app-document-review',
    templateUrl: './document-review.component.html',
    styleUrls: ['./document-review.component.scss'],
    standalone: true,
  imports: [HeaderNexumComponent, NgIf, RouterLink, PdfViewerComponent, NgForOf]
})
export class DocumentReviewComponent implements OnInit{

  private _sessionStorage: SessionStorageService = inject(SessionStorageService)

  public tabSelect = 'document';//document - annexes
  public formValues: IValuesStep1 = {} as IValuesStep1
  public srcPDF = '';

  ngOnInit() {
    this.formValues = this._sessionStorage.getItem<IValuesStep1>('send-document-step-1')!;
    this.srcPDF = this.formValues.formMainData.file.base64
  }

  public setShowNewPdf(src: string){
    this.srcPDF = src;
  }
}
