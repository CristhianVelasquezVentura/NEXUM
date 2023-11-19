import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderNexumComponent } from '../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-signature-organization',
    templateUrl: './signature-organization.component.html',
    styleUrls: ['./signature-organization.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, ReactiveFormsModule, RouterLink, NgIf]
})
export class SignatureOrganizationComponent {

}
