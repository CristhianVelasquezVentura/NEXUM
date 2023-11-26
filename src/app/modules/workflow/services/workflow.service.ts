import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {
  DtoWorkflow,
  ResponseAttachedDocument,
  ResponseEmailNoticeToSigner,
  ResponseGetRolesSigners,
  ResponseGetUserById,
  ResponseGetWorkflow, ResponseNotificationEmail,
  ResponseNotificationSms,
  ResponseOtp,
  ResponseOtpNotificationEmail,
  ResponseOtpNotificationSms,
  ResponseRequestedDocument,
  ResponseSignatureAppearance,
  ResponseSmsNoticeToSigner,
  ResponseWorkflow
} from "../models/steps";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "@env/environment";
import {EnvServiceProvider} from "@app/env/env.service.provider";
import {EnvService} from "@app/env/env.service";

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

  constructor(
    private _http: HttpClient,
    private env: EnvService
  ) { }

  public createWorkflow(workflow: DtoWorkflow): Observable<ResponseWorkflow> {
    return this._http.post<ResponseWorkflow>(this.urlCreateWorkflow, workflow).pipe(map(res => res));
  }

  public getWorkflows(limit: number, offset: number): Observable<ResponseGetWorkflow> {
    return this._http.get<ResponseGetWorkflow>(`${this.env.API_ENGINE}/api/v1/workflow/${limit}/${offset}`).pipe(map(res => res));
  }

  public getSignatureAppearance(workflowId: number): Observable<ResponseSignatureAppearance> {
    return this._http.get<ResponseSignatureAppearance>(this.urlGetSignatureAppearance + '/' + workflowId).pipe(map(res => res));
  }

  public getRolesSigners(workflowId: number): Observable<ResponseGetRolesSigners> {
    return this._http.get<ResponseGetRolesSigners>(this.urlGetRolesSigners + '/' + workflowId).pipe(map(res => res));
  }

  public getEmailNoticeSigner(workflowId: number): Observable<ResponseEmailNoticeToSigner> {
    return this._http.get<ResponseEmailNoticeToSigner>(this.urlEmailNoticeSigner + '/workflow/' + workflowId).pipe(map(res => res));
  }

  public getSmsNoticeSigner(workflowId: number): Observable<ResponseSmsNoticeToSigner> {
    return this._http.get<ResponseSmsNoticeToSigner>(this.urlSmsNoticeSigner + '/workflow/' + workflowId).pipe(map(res => res));
  }

  public getOtp(workflowId: number): Observable<ResponseOtp> {
    return this._http.get<ResponseOtp>(this.urlOtp + '/workflow/' + workflowId).pipe(map(res => res));
  }

  public getOtpNotificationsSms(otpId: number): Observable<ResponseOtpNotificationSms> {
    return this._http.get<ResponseOtpNotificationSms>(this.urlOtpNotificationsSms + '/otp/' + otpId).pipe(map(res => res));
  }

  public getOtpNotificationsEmail(otpId: number): Observable<ResponseOtpNotificationEmail> {
    return this._http.get<ResponseOtpNotificationEmail>(this.urlOtpNotificationsEmail + '/otp/' + otpId).pipe(map(res => res));
  }

  public getAttachedDocument(workflowId: number): Observable<ResponseAttachedDocument> {
    const token = sessionStorage.getItem("access-token");
    return this._http.get<ResponseAttachedDocument>(this.urlAttachedDocument + '/workflow/' + workflowId,{headers: { 'Authorization': `Bearer ${token}`}}).pipe(map(res => res));
  }

  public getRequestedDocument(workflowId: number): Observable<ResponseRequestedDocument> {
    const token = sessionStorage.getItem("access-token");
    return this._http.get<ResponseRequestedDocument>(this.urlRequestedDocument + '/workflow/' + workflowId,{headers: { 'Authorization': `Bearer ${token}`}}).pipe(map(res => res));
  }

  public getNotificationSms(workflowId: number): Observable<ResponseNotificationSms> {
    return this._http.get<ResponseNotificationSms>(this.urlNotificationSms + '/workflow/' + workflowId).pipe(map(res => res));
  }

  public getNotificationEmail(workflowId: number): Observable<ResponseNotificationEmail> {
    return this._http.get<ResponseNotificationEmail>(this.urlNotificationEmail + '/workflow/' + workflowId).pipe(map(res => res));
  }
}
