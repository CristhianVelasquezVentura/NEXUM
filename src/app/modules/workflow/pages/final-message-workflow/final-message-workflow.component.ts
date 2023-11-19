import { Component } from '@angular/core';

import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HeaderNexumComponent} from "@app/core/ui";

@Component({
  selector: 'app-final-message-workflow',
  templateUrl: './final-message-workflow.component.html',
  styleUrls: ['./final-message-workflow.component.scss'],
  imports: [
    NgIf,
    RouterLink,
    HeaderNexumComponent
  ],
  standalone: true
})
export class FinalMessageWorkflowComponent {

}
