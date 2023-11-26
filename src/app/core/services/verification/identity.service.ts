import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {environment} from "@env/environment";
import {EnvServiceProvider} from "@app/env/env.service.provider";
import { ValidationUserTest } from '@app/core/models/test-validation';
@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(private http: HttpClient) {

  }
  public identityValidation(data: ValidationUserTest) {
    const url = `${EnvServiceProvider.useFactory().API_DOCUMENT}/api/v1/files/validate`;

    return this.http.post<any>(url, data)
      .pipe(map((res: any) => {
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An error ocured retrienving data';
    if (err) {
      errorMessage = `Error:code ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
