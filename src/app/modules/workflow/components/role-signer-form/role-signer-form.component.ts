import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'workflow-role-signer-form',
  templateUrl: './role-signer-form.component.html',
  styleUrls: ['./role-signer-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule
  ]
})
export class RoleSignerFormComponent {
  @Output() cancelEvent = new EventEmitter();

  public emitCancelEvent(){
    this.cancelEvent.emit()
  }
}
