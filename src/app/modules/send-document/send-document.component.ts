import { Component } from '@angular/core';
import { ToolbarComponent } from '../../core/ui/toolbar/toolbar.component';
import { RouterLink } from '@angular/router';
import { HeaderNexumComponent } from '../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-send-document',
    templateUrl: './send-document.component.html',
    styleUrls: ['./send-document.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, RouterLink, ToolbarComponent]
})
export class SendDocumentComponent {

}
