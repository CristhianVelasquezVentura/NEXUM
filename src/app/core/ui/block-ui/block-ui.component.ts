import {Component, Input, TemplateRef} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'ec-block-ui',
  templateUrl: './block-ui.component.html',
  styleUrls: ['./block-ui.component.scss'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class BlockUiComponent {
  @Input() blocked: boolean = true;
}
