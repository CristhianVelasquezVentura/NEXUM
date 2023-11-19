import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderNexumComponent } from '../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-signatures-sections',
    templateUrl: './signatures-sections.component.html',
    styleUrls: ['./signatures-sections.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, RouterLink]
})
export class SignaturesSectionsComponent {

}
