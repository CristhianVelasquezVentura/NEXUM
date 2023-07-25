import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {VerificationService} from "@app/core/services/verification/verification.service";
import {DropdownModel} from "ecapture-ng-ui";
import {onlyNumbers} from "@app/core/utils/validations/validations";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tracking-document',
  templateUrl: './tracking-document.component.html',
  styleUrls: ['./tracking-document.component.scss']
})
export class TrackingDocumentComponent implements OnDestroy{

  public urlBjungle = 'http://bjungle.net.s3-website-us-east-1.amazonaws.com/explorer/viewer?info=transaction&id='

  public documentId: string = '';
  public traceability: any[] = [];

  public isBlockPage: boolean = false;
  private _subscriptions = new Subscription();

  constructor(
    private _verificationService: VerificationService, private _messageService: ToastService
  ) {
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  public getTrackingDocument(): void {
    if (!this.documentId) {
      this._messageService.add({type: 'warning', message: 'Ingrese el ID del Documento', life: 5000});
      return
    }

    this.traceability = [];
    this._subscriptions.add(
      this._verificationService.getTrackingDocument(Number(this.documentId)).subscribe({
          next: (res) => {
            if (res.error) {
              this._messageService.add({type: 'error', message: res.msg, life: 5000});
              return
            }

            if (res.data === null || res.data.length === 0) {
              this._messageService.add({type: 'warning', message: 'Este documento no existe o no tiene trazabilidad', life: 5000});
              return
            }

            this.traceability = res.data?.map((tc: any) => ({...tc, active: false}));
          },
          error: (err: Error) => {
            this._messageService.add({
              type: 'error',
              message: 'Conexión perdida, intente de nuevo y revise su conexión a internet!',
              life: 5000
            });
          }
        }
      )
    );
  }

  public onlyNumbers = (value: KeyboardEvent) => onlyNumbers(value);

}
