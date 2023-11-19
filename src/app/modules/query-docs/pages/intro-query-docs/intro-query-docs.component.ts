import { Component } from '@angular/core';
import { ToolbarComponent } from '../../../../core/ui/toolbar/toolbar.component';
import { HeaderNexumComponent } from '../../../../core/ui/header-nexum/header-nexum.component';

@Component({
    selector: 'app-intro-query-docs',
    templateUrl: './intro-query-docs.component.html',
    styleUrls: ['./intro-query-docs.component.scss'],
    standalone: true,
    imports: [HeaderNexumComponent, ToolbarComponent]
})
export class IntroQueryDocsComponent {

}
