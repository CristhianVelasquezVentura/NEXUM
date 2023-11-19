import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-header-document-sign',
    templateUrl: './header-document-sign.component.html',
    styleUrls: ['./header-document-sign.component.scss'],
    standalone: true
})
export class HeaderDocumentSignComponent implements OnInit {

  @Input() title = '';

  constructor() { }

  ngOnInit(): void {
  }

}
