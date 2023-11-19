import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { HeaderNexumComponent } from '../../../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-order-sign-doc',
    templateUrl: './order-sign-doc.component.html',
    styleUrls: ['./order-sign-doc.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, NgIf]
})
export class OrderSignDocComponent {

}
