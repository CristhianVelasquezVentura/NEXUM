import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import {ToastItemComponent} from './toast-item/toast-item.component';
import {BlockPageComponent} from "@app/core/ui/block-page/block-page.component";
import {ToastComponent} from "@app/core/ui/toast/toast.component";


@NgModule({
  declarations: [
    PdfViewerComponent,
    ToastItemComponent,
    BlockPageComponent,
    ToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PdfViewerComponent, ToastItemComponent, BlockPageComponent, ToastComponent]
})
export class UiModule {
}
