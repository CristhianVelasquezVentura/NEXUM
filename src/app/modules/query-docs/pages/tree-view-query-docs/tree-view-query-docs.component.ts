import { Component } from '@angular/core';
import {UiModule} from "@app/core/ui/ui.module";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-tree-view-query-docs',
  templateUrl: './tree-view-query-docs.component.html',
  styleUrls: ['./tree-view-query-docs.component.scss'],
  imports: [
    UiModule,
    NgIf
  ],
  standalone: true
})
export class TreeViewQueryDocsComponent {

}
