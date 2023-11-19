import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderNexumComponent } from '../../../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-order-sign-list',
    templateUrl: './order-sign-list.component.html',
    styleUrls: ['./order-sign-list.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, ReactiveFormsModule, NgIf, RouterLink]
})
export class OrderSignListComponent {

}
