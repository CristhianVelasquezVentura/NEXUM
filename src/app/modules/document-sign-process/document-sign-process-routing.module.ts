import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DocumentSignProcessComponent} from "@app/modules/document-sign-process/document-sign-process.component";

const routes: Routes = [
  {path: '', component: DocumentSignProcessComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class DocumentSignProcessRoutingModule {
}
