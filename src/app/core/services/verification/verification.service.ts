import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "@app/core/models/global.model";
import {EnvService} from "@app/env/env.service";
import {ITraceability} from "@app/core/models/traza.model";

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  constructor(
      private http: HttpClient,
      private env: EnvService,
      ) {
  }

  public validateDataFile(data: any): Observable<Response<string>> {
    return this.http.post<Response<string>>(`${this.env.API_ENGINE}/api/v1/files/validate`, data);
  }

  public getTrackingDocument(document_id: number): Observable<Response<ITraceability[]>> {
    return this.http.get<Response<ITraceability[]>>(`${this.env.API_ENGINE}/api/v1/document/tracking/${document_id}`);
  }

  public validateDownloadFile(document_id: number, password: string) {
    return this.http.get<any>(`${this.env.API_ENGINE}/api/v1/file/validate-download/${document_id}/${password}`);
  }
}
