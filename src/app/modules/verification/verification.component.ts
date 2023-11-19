import { Component, OnInit } from '@angular/core';
import { TrackingDocumentComponent } from './pages/tracking-document/tracking-document.component';
import { ValidateDocumentComponent } from './pages/validate-document/validate-document.component';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.scss'],
    standalone: true,
    imports: [RouterLink, NgIf, ValidateDocumentComponent, TrackingDocumentComponent]
})
export class VerificationComponent implements OnInit {

  public tabSelect: string = 'validation';
  constructor() { }

  ngOnInit(): void {
  }

}
