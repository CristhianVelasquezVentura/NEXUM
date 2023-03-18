import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AccessProcessSignComponent} from "./pages/access-process-sign/access-process-sign.component";
import {ReviewDocumentComponent} from "./pages/review-document/review-document.component";
import {SignUserComponent} from "./pages/sign-user/sign-user.component";
import { ValidSignComponent } from "./pages/valid-sign/valid-sign.component";

const routes: Routes = [
  {path: '', redirectTo: 'access', pathMatch: 'full'},
  {path: 'access', component: AccessProcessSignComponent},
  {path: 'review-doc', component: ReviewDocumentComponent},
  {path: 'sign-user', component: SignUserComponent},
  {path: 'valid-sign', component: ValidSignComponent},
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
