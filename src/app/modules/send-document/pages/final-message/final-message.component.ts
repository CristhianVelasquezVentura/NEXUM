import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderNexumComponent } from '@app/core/ui';

@Component({
    selector: 'app-final-message',
    templateUrl: './final-message.component.html',
    styleUrls: ['./final-message.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, ReactiveFormsModule, NgIf, RouterLink]
})
export class FinalMessageComponent {

}
