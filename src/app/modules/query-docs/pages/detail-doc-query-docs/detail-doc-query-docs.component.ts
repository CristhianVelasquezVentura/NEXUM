import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HeaderNexumComponent } from '../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-detail-doc-query-docs',
    templateUrl: './detail-doc-query-docs.component.html',
    styleUrls: ['./detail-doc-query-docs.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, NgIf]
})
export class DetailDocQueryDocsComponent {

}
