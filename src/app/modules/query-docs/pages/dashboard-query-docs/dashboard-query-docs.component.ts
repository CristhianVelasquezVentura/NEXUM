import { Component } from '@angular/core';
import {UiModule} from "@app/core/ui/ui.module";

@Component({
  selector: 'app-dashboard-query-docs',
  templateUrl: './dashboard-query-docs.component.html',
  styleUrls: ['./dashboard-query-docs.component.scss'],
  imports: [
    UiModule
  ],
  standalone: true
})
export class DashboardQueryDocsComponent {

}
