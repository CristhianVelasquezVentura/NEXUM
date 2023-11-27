import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {
    DtoWorkflow, IWorkflow,
    ResponseEmailNoticeToSigner,
    ResponseGetRolesSigners,
    ResponseGetWorkflow, ResponseNotificationEmail,
    ResponseNotificationSms,
    ResponseOtp,
    ResponseOtpNotificationEmail,
    ResponseOtpNotificationSms,
    ResponseSignatureAppearance,
    ResponseSmsNoticeToSigner,
    ResponseWorkflow
} from "../models/steps";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {EnvServiceProvider} from "@app/env/env.service.provider";
import {EnvService} from "@app/env/env.service";
import {Response} from "@app/core/models/global.model";
import {AttachedDocument, RequestedDocument} from "@app/core/models/workflow/workflow.model";

@Injectable({
    providedIn: 'root'
})
export class WorkflowService {

    private API_VERSION = '/api/v1'

    private urlCreateWorkflow = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/workflow';
    private urlGetSignatureAppearance = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/signature_appearance/workflow';
    private urlGetRolesSigners = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/roles/signer/workflow';
    private urlEmailNoticeSigner = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/email/notice/signer';
    private urlSmsNoticeSigner = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/sms/notice/signer';
    private urlOtp = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/otp';
    private urlOtpNotificationsSms = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/otp-notifications/sms';
    private urlOtpNotificationsEmail = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/notification/otp/email';
    private urlNotificationSms = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/notification/sms';
    private urlNotificationEmail = EnvServiceProvider.useFactory().API_WORKFLOW + '/api/v1/notification/email';

    constructor(
        private _http: HttpClient,
        private env: EnvService
    ) {
    }

    public createWorkflow(workflow: DtoWorkflow): Observable<Response<IWorkflow>> {
        return this._http.post<ResponseWorkflow>(this.urlCreateWorkflow, workflow).pipe(map(res => res));
    }

    public getWorkflows(limit: number, offset: number): Observable<Response<IWorkflow[]>> {
        return this._http.get<ResponseGetWorkflow>(this.env.API_ENGINE + this.API_VERSION + `/workflow/${limit}/${offset}`);
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

    public getAttachedDocument(workflowId: number): Observable<Response<AttachedDocument[]>> {
        return this._http.get<Response<AttachedDocument[]>>(this.env.API_ENGINE + this.API_VERSION + '/attached/document/workflow/' + workflowId);
    }

    public getRequestedDocument(workflowId: number): Observable<Response<RequestedDocument[]>> {
        return this._http.get<Response<RequestedDocument[]>>(this.env.API_ENGINE + this.API_VERSION + '/requested/document/workflow/' + workflowId);
    }

    public getNotificationSms(workflowId: number): Observable<ResponseNotificationSms> {
        return this._http.get<ResponseNotificationSms>(this.urlNotificationSms + '/workflow/' + workflowId).pipe(map(res => res));
    }

    public getNotificationEmail(workflowId: number): Observable<ResponseNotificationEmail> {
        return this._http.get<ResponseNotificationEmail>(this.urlNotificationEmail + '/workflow/' + workflowId).pipe(map(res => res));
    }
}
