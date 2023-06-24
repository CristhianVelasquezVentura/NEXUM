import { Component, OnInit } from '@angular/core';
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {VerificationService} from "@app/core/services/verification/verification.service";
import {DropdownModel} from "ecapture-ng-ui";
import {onlyNumbers} from "@app/core/utils/validations/validations";

@Component({
  selector: 'app-tracking-document',
  templateUrl: './tracking-document.component.html',
  styleUrls: ['./tracking-document.component.scss']
})
export class TrackingDocumentComponent implements OnInit {

  public urlBjungle = 'http://bjungle.net.s3-website-us-east-1.amazonaws.com/explorer/viewer?info=transaction&id='

  public documentId!: number;
  public traceability: any[] = [];
  public trackingValue: any[] = [];
  public trackingTemp: any[] = [];
  public isLoading: boolean = false;
  public lengthTracking: number = 0;
  public paginationValue: number = 5;
  public leftLimit: number = 0;
  public rightLimit: number = 5;
  public paginationIndex: number = 1;

  public phoneStyle: DropdownModel ={
    textColor: 'text-outline-gray-3 text-label-01',
    container: {
      background: 'bg-container-gray-1',
      border: {
        color: 'border-container-gray-1',
        size: 'border-4',
        round: 'rounded-lg',
        style: 'border-solid',
        hover: 'border-outline-gray-4'
      }
    },
    optionContainer: {
      background: 'bg-container-gray-1',
      border: {
        color: 'border-outline-gray-4',
        size: 'border-2',
        round: 'rounded',
        style: 'border-solid',
        hover: 'bg-outline-gray-4'
      }
    },
  };

  public optionPagination = [
    {value: "5", label: "5"},
    {value: "10", label: "10"},
    {value: "15", label: "15"},
    {value: "20", label: "20"},
  ];

  public paginationNumberCurrency = {value: "5", label: "5"}

  constructor(
    private _verificationService: VerificationService, private _messageService: ToastService
  ) {
  }

  ngOnInit(): void {
    // this.getInitData();
  }

  private getInitData(): void {
    this.traceability = [];
    if (this.documentId) {
      this.isLoading = true;
      this._verificationService.getTrackingDocument(this.documentId).subscribe(
        {
          next: (res) => {
            if (res.data === null) {
              this._messageService.add({type: 'error', message: 'No se encontraron resultados', life: 5000});
            } else {
              this.traceability = res.data
                ?.map((tc: any) => {
                  tc['id'] = tc.id;
                  tc['document_id'] = tc.document_id;
                  tc['queue_id'] = tc.queue_id;
                  tc['event'] = tc.event;
                  tc['transaction_id'] = tc.transaction_id;
                  tc['id_user'] = tc.id_user;
                  tc['url_lion'] = tc.url_lion;
                  tc['created_at'] = tc.created_at;
                  tc['updated_at'] = tc.updated_at;
                  tc['active'] = false;
                  return tc;
                });
              // this.traceability = [...this.traceability,...this.traceability]
              this.lengthTracking = Math.ceil(this.traceability.length / this.paginationValue);
              this.trackingValue = this.traceability.slice(this.leftLimit, this.rightLimit);
            }
            this.isLoading = false;
          },
          error: (err: Error) => {
            this.isLoading = false;
            this._messageService.add({
              type: 'error',
              message: 'Conexión perdida, intente de nuevo y revise su conexión a internet!',
              life: 5000
            });
          }
        }
      );
    }
  }


  public activeTracking(index: number): void {
    this.traceability.forEach((tc: any) => {
      tc.active = false;
    });
    this.traceability[index].active = true;
  }

  public closeTracking(index: number): void {
    this.traceability[index].active = false;
  }

  public nextPage(): void {
    this.paginationIndex++;
    this.leftLimit += this.paginationValue;
    this.rightLimit += this.paginationValue;
    this.trackingValue = this.traceability.slice(this.leftLimit, this.rightLimit);
  }

  public beforePage(): void {
    this.paginationIndex--;
    this.leftLimit -= this.paginationValue;
    this.rightLimit -= this.paginationValue;
    this.trackingValue = this.traceability.slice(this.leftLimit, this.rightLimit);
  }

  public changePaginationValue(): void {
    this.leftLimit = 0;
    this.rightLimit = this.paginationValue;
    this.lengthTracking = Math.ceil(this.traceability.length / this.paginationValue);
    this.trackingValue = this.traceability.slice(this.leftLimit, this.rightLimit);
  }

  public searchTracking(): void {
    this.getInitData()
  }

  public onlyNumbers = (value: KeyboardEvent) => onlyNumbers(value);

}
