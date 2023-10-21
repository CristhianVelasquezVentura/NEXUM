import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentSignProcessComponent} from "./document-sign-process.component";
import {AccessProcessSignComponent} from './pages/access-process-sign/access-process-sign.component';
import {DocumentSignProcessRoutingModule} from "./document-sign-process-routing.module";
import {HeaderDocumentSignComponent} from './components/header-document-sign/header-document-sign.component';
import {ReviewDocumentComponent} from './pages/review-document/review-document.component';
import {SignUserComponent} from './pages/sign-user/sign-user.component';
import {ValidSignComponent} from './pages/valid-sign/valid-sign.component';
import {SteperComponent} from './components/steper/steper.component';
import {SignService} from "@app/core/services/sign/sign.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {DocumentService} from "@app/core/services/document/document.service";
import {UiModule} from "@app/core/ui/ui.module";
import {SignatureInterceptor} from "@app/core/services/interceptors/sign/sign.interceptor";
import {ToastService} from "@app/public/services/toast/toast.service";
import {OtpService} from "@app/core/services/otp/otp.service";
import {NgxCaptchaModule} from "ngx-captcha";
import { AttachDocumentsComponent } from './pages/attach-documents/attach-documents.component';

@NgModule({
    declarations: [
        DocumentSignProcessComponent,
        AccessProcessSignComponent,
        HeaderDocumentSignComponent,
        ReviewDocumentComponent,
        SignUserComponent,
        ValidSignComponent,
        SteperComponent,
        AttachDocumentsComponent,
    ],
    imports: [
        CommonModule,
        DocumentSignProcessRoutingModule,
        ReactiveFormsModule,
        UiModule,
        NgxCaptchaModule
    ],
    providers: [
        SignService,
        ToastService,
        DocumentService,
        OtpService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SignatureInterceptor,
            multi: true
        }
    ]
})
export class DocumentSignProcessModule {
}
