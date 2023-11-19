import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HeaderNexumComponent } from '../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-type-query-docs',
    templateUrl: './type-query-docs.component.html',
    styleUrls: ['./type-query-docs.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, NgIf]
})
export class TypeQueryDocsComponent {

}
