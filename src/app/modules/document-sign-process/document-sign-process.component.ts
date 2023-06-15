import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GetTokenExpirationDate, GetTokenUser, IsInvalidToken} from "@app/core/utils/validations/validations";
import {Observable, Subscription, timer} from "rxjs";
import {Time} from "@app/core/utils/constant/constant";
import {Token} from "@app/core/models/token";
import {SignService} from "@app/core/services/sign/sign.service";
import {Message} from "@app/core/models/message";
import {ToastService} from "@app/core/ui/services/toast/toast.service";

@Component({
  selector: 'app-document-sign-process',
  templateUrl: './document-sign-process.component.html',
  styleUrls: ['./document-sign-process.component.scss']
})
export class DocumentSignProcessComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription = new Subscription();
  private _source: Observable<number> = timer(0, 1000);
  private token: string = '';

  public isBlock: boolean = false;
  public day: number = 0;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  public tokenData!: Token;
  public isFinish: boolean = false;
  public page: string = 'sign-user';
  public message!: Message;

  constructor(
    private _routerParam: ActivatedRoute,
    private _messageService: ToastService,
    private _signService: SignService
  ) {
    this.getParams();
  }

  ngOnInit(): void {
    if (!this.token) {
      this._messageService.add({
        type: 'warning',
        message: 'No está autorizado para firmar este documento!',
        life: 5000
      });
      this.message = {
        icon: 'Warning',
        Message: 'No está autorizado para firmar este documento!'
      };
      this.isFinish = true;
      return;
    }

    /*if (IsInvalidToken(this.token)) {
      this.isBlock = false;
      this._messageService.add({type: 'warning', message: 'El documento ha caducado!', life: 5000});
      this.message = {
        icon: 'Warning',
        Message: 'El documento ha caducado!'
      };
      this.isFinish = true;
      return;
    }*/

    this.tokenData = GetTokenUser(this.token);
    this.initClock();

  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private getParams(): void {
    const routeParam = this._routerParam.snapshot.queryParams;
    const token = routeParam['token'];
    if (token) {
      sessionStorage.setItem("signature-token", token);
      this.token = token;
    }
  }

  private initClock(): void {
    const ttl = GetTokenExpirationDate(this.token);
    if (!ttl) {
      this._messageService.add({
        type: 'warning',
        message: 'No se pudo obtener el tiempo de vida del documento',
        life: 5000
      });
      this.isFinish = true;
      return;
    }
    this._subscriptions.add(
      this._source.subscribe(() => {
        this.showDate(ttl);
      })
    );
  }

  private showDate(ttl: Date): void {
    const now: any = Time.Now();
    const end: any = Time.setDate(ttl);
    let distance: number = end - now;
    this.day = Math.floor(distance / Time.DAY);
    this.hours = Math.floor((distance % Time.DAY) / Time.HOUR);
    this.minutes = Math.floor((distance % Time.HOUR) / Time.MINUTE);
    this.seconds = Math.floor((distance % Time.MINUTE) / Time.SECOND);

    if (this.seconds === 0 && this.minutes === 0 && this.hours === 0 && this.day === 0) {
      this._messageService.add({type: 'info', message: 'La sesión ha expirado!', life: 5000});
      this.isFinish = true;
      return;
    }
  }

  public authenticated(): void {
    this.page = 'document-review';
  }

  public nextPage(page: string): void {
    this.page = page;
  }

}
