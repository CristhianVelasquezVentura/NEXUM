import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {EnvServiceProvider} from "@app/core/services/env/env.service.provider";
import {
  Document, DocumentFilter,
  ResponseCreateDocument,
  ResponseDocumentById,
  ResponseDocumentsStatus, ResponseFilesByDocumentId
} from "@app/core/models/document";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private urlGetDocumentById: string;
  private urlGetFilesByDocumentId: string;

  private urlCreateDocument: string;
  private urlGetDocumentsFilter: string;
  private urlGetDocumentsStatus: string;

  constructor(private _htt: HttpClient) {
    this.urlCreateDocument = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/documents';
    this.urlGetDocumentsStatus = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/document/status-all';
    this.urlGetDocumentsFilter = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/document/all';

    this.urlGetDocumentById = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/document/';
    this.urlGetFilesByDocumentId = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/files/document/';

  }

  public getDocumentByID(id: number): Observable<ResponseDocumentById> {
    return this._htt.get<ResponseDocumentById>(this.urlGetDocumentById + id).pipe(map((res) => res));
  }

  public getFilesByDocumentID(id: number): Observable<ResponseFilesByDocumentId> {
    return this._htt.get<ResponseFilesByDocumentId>(this.urlGetFilesByDocumentId + id).pipe(map((res) => res));
  }

  public createDocument(data: Document): Observable<ResponseCreateDocument> {
    return this._htt.post<ResponseCreateDocument>(this.urlCreateDocument, data).pipe(map(res => res));
  }

  public getDocumentStatus(): Observable<ResponseDocumentsStatus> {
    return this._htt.get<ResponseDocumentsStatus>(this.urlGetDocumentsStatus).pipe(map(res => res));
  }

  public getDocumentsByFilters(dataFilter: DocumentFilter): Observable<ResponseDocumentsStatus> {
    return this._htt.post<ResponseDocumentsStatus>(this.urlGetDocumentsFilter, dataFilter).pipe(map(res => res));
  }
}
