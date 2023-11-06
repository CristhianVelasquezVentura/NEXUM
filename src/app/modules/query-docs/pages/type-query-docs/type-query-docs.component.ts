import { Component } from '@angular/core';
import {UiModule} from "@app/core/ui/ui.module";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-type-query-docs',
  templateUrl: './type-query-docs.component.html',
  styleUrls: ['./type-query-docs.component.scss'],
  imports: [
    UiModule,
    NgIf
  ],
  standalone: true
})
export class TypeQueryDocsComponent {

}
