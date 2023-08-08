import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {environment} from "@env/environment";
import {EnvServiceProvider} from "@app/core/services/env/env.service.provider";

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http: HttpClient,) { }

  public validateDataFile(data: any) {
    const url = `${EnvServiceProvider.useFactory().API_DOCUMENT}/api/v1/files/validate`;

    return this.http.post<any>(url, data)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  public getTrackingDocument(document_id: number) {
    const url = `${EnvServiceProvider.useFactory().API_DOCUMENT}/api/v1/document/tracking/${document_id}`;

    return this.http.get<any>(url)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
    // return new Observable<any>(observer => observer.next(this.obj))
  }

  public validateDownloadFile(document_id: number, password: string) {
    const url = `${EnvServiceProvider.useFactory().API_DOCUMENT}/api/v1/file/validate-download/${document_id}/${password}`;

    return this.http.get<any>(url)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
    // return new Observable<any>(observer => observer.next(this.obj))
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An error ocured retrienving data';
    if (err) {
      errorMessage = `Error:code ${err.message}`;
    }
    return throwError(errorMessage);

  }

}
