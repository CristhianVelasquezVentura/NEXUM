import { Component } from '@angular/core';
import {UiModule} from "@app/core/ui/ui.module";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-workflows-query-docs',
  templateUrl: './list-workflows-query-docs.component.html',
  styleUrls: ['./list-workflows-query-docs.component.scss'],
  imports: [
    UiModule,
    NgIf,
    RouterLink
  ],
  standalone: true
})
export class ListWorkflowsQueryDocsComponent {

}
