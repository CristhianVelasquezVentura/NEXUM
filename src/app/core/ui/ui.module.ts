import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import {ToastItemComponent} from './toast-item/toast-item.component';
import {BlockPageComponent} from "@app/core/ui/block-page/block-page.component";
import {ToastComponent} from "@app/core/ui/toast/toast.component";
import {FileUploadComponent} from "@app/core/ui/file-upload/file-upload.component";
import { HeaderNexumComponent } from './header-nexum/header-nexum.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    PdfViewerComponent,
    ToastItemComponent,
    BlockPageComponent,
    ToastComponent,
    FileUploadComponent,
    HeaderNexumComponent,
    ToolbarComponent
  ],
    imports: [
        CommonModule,
        RouterLink
    ],
  exports: [
    PdfViewerComponent,
    ToastItemComponent,
    BlockPageComponent,
    ToastComponent,
    FileUploadComponent,
    HeaderNexumComponent,
    ToolbarComponent
  ]
})
export class UiModule {
}
