import { Component } from '@angular/core';
import {UiModule} from "@app/core/ui/ui.module";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-intro-query-docs',
  templateUrl: './intro-query-docs.component.html',
  styleUrls: ['./intro-query-docs.component.scss'],
  imports: [
    UiModule,
    RouterLink
  ],
  standalone: true
})
export class IntroQueryDocsComponent {

}
