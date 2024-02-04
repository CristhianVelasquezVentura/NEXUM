import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import {RouterLink} from "@angular/router";
import { HeaderNexumComponent } from '../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-list-workflows-query-docs',
    templateUrl: './list-workflows-query-docs.component.html',
    styleUrls: ['./list-workflows-query-docs.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, NgIf, RouterLink]
})
export class ListWorkflowsQueryDocsComponent {

}
