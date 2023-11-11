import { Component } from '@angular/core';
import {UiModule} from "@app/core/ui/ui.module";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-final-message-workflow',
  templateUrl: './final-message-workflow.component.html',
  styleUrls: ['./final-message-workflow.component.scss'],
  imports: [
    UiModule,
    NgIf,
    RouterLink
  ],
  standalone: true
})
export class FinalMessageWorkflowComponent {

}
