import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HeaderNexumComponent } from '../../../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-section-sign-form',
    templateUrl: './section-sign-form.component.html',
    styleUrls: ['./section-sign-form.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, NgIf]
})
export class SectionSignFormComponent {

}
