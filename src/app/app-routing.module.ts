import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', redirectTo: 'sign', pathMatch: 'full'},
  {path: 'sign', loadChildren: () => import('./modules/document-sign-process/document-sign-process.module').then((m) => m.DocumentSignProcessModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    }),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}
