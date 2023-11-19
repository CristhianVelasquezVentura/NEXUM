import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HeaderNexumComponent } from '../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-tree-view-query-docs',
    templateUrl: './tree-view-query-docs.component.html',
    styleUrls: ['./tree-view-query-docs.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, NgIf]
})
export class TreeViewQueryDocsComponent {

}
