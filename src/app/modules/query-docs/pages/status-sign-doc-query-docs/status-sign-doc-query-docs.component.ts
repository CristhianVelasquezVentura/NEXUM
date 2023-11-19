import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HeaderNexumComponent } from '../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-status-sign-doc-query-docs',
    templateUrl: './status-sign-doc-query-docs.component.html',
    styleUrls: ['./status-sign-doc-query-docs.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, NgIf]
})
export class StatusSignDocQueryDocsComponent {

}
