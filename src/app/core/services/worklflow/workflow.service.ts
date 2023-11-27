import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ResponseGetWorkflow
} from "@app/modules/workflow/models/steps";
import {EnvServiceProvider} from "@app/env/env.service.provider";
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private urlCreateWorkflow = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/workflow';
  private urlGetWorkflow = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/workflow/10/0';
  private urlGetSignatureAppearance = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/signature_appearance/workflow';
  private urlGetRolesSigners = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/roles/signer/workflow';
  private urlEmailNoticeSigner = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/email/notice/signer';
  private urlSmsNoticeSigner = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/sms/notice/signer';
  private urlOtp = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/otp';
  private urlOtpNotificationsSms = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/otp-notifications/sms';
  private urlOtpNotificationsEmail = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/notification/otp/email';
  private urlAttachedDocument = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/attached/document';
  private urlRequestedDocument = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/requested/document';
  private urlNotificationSms = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/notification/sms';
  private urlNotificationEmail = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/notification/email';
  constructor(    private _http: HttpClient
    ) {
  }
  public getWorkflows(): Observable<ResponseGetWorkflow> {
    return this._http.get<ResponseGetWorkflow>(this.urlGetWorkflow).pipe(map(res => res));
  }

}
