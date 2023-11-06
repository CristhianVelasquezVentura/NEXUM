import { Component } from '@angular/core';
import {UiModule} from "@app/core/ui/ui.module";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-detail-doc-query-docs',
    templateUrl: './detail-doc-query-docs.component.html',
    styleUrls: ['./detail-doc-query-docs.component.scss'],
    imports: [
        UiModule,
        NgIf
    ],
    standalone: true
})
export class DetailDocQueryDocsComponent {

}
