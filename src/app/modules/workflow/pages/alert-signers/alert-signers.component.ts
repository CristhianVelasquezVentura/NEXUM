import { Component } from '@angular/core';
import {UiModule} from "@app/core/ui/ui.module";
import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
@Component({
  selector: 'app-alert-signers',
  templateUrl: './alert-signers.component.html',
  styleUrls: ['./alert-signers.component.scss'],
  imports: [
    UiModule,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true
})
export class AlertSignersComponent {

}
