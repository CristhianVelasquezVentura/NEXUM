import {Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink]
})
export class ToolbarComponent {

  @Input() module: string = 'dashboard';

}
