import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocumentSignProcessComponent} from "./document-sign-process.component";
import { AccessProcessSignComponent } from './pages/access-process-sign/access-process-sign.component';
import {DocumentSignProcessRoutingModule} from "./document-sign-process-routing.module";
import { HeaderDocumentSignComponent } from './components/header-document-sign/header-document-sign.component';
import { ReviewDocumentComponent } from './pages/review-document/review-document.component';
import { SignUserComponent } from './pages/sign-user/sign-user.component';
import { ValidSignComponent } from './pages/valid-sign/valid-sign.component';
import { SteperComponent } from './components/steper/steper.component';
import {ToastComponent} from "../../components-global/toast/toast.component";

@NgModule({
  declarations: [
    DocumentSignProcessComponent,
    AccessProcessSignComponent,
    HeaderDocumentSignComponent,
    ReviewDocumentComponent,
    SignUserComponent,
    ValidSignComponent,
    SteperComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    DocumentSignProcessRoutingModule,
  ]
})
export class DocumentSignProcessModule {}
