import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import {ToastItemComponent} from './toast-item/toast-item.component';
import {BlockPageComponent} from "@app/core/ui/block-page/block-page.component";


@NgModule({
  declarations: [
    PdfViewerComponent,
    ToastItemComponent,
    BlockPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PdfViewerComponent, ToastItemComponent, BlockPageComponent]
})
export class UiModule {
}
