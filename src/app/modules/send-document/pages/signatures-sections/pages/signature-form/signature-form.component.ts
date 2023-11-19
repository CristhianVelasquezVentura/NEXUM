import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HeaderNexumComponent } from '../../../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-signature-form',
    templateUrl: './signature-form.component.html',
    styleUrls: ['./signature-form.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, NgIf]
})
export class SignatureFormComponent {

  public modalAddSolicitude = false;

}
