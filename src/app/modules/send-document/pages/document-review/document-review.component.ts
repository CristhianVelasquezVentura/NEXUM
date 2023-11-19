import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { HeaderNexumComponent } from '../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-document-review',
    templateUrl: './document-review.component.html',
    styleUrls: ['./document-review.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, NgIf, RouterLink]
})
export class DocumentReviewComponent {

  public tabSelect = 'document';//document - annexes

}
