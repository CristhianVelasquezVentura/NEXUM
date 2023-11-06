import { Component } from '@angular/core';
import {UiModule} from "@app/core/ui/ui.module";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-status-sign-doc-query-docs',
  templateUrl: './status-sign-doc-query-docs.component.html',
  styleUrls: ['./status-sign-doc-query-docs.component.scss'],
  imports: [
    UiModule,
    NgIf
  ],
  standalone: true
})
export class StatusSignDocQueryDocsComponent {

}
