import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderNexumComponent } from '../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-final-revision',
    templateUrl: './final-revision.component.html',
    styleUrls: ['./final-revision.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, ReactiveFormsModule, RouterLink]
})
export class FinalRevisionComponent {

}
