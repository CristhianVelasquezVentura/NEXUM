import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {EnvServiceProvider} from "@app/env/env.service.provider";
import {OtpRequest} from "@app/core/models/otp";
import {Response} from "@app/core/models/response";

@Injectable({
  providedIn: "root",
})
export class OtpService {
  private urlGenerateOtp: string = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/otp';
  private urlValidateOtp: string = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/otp/validate';

  constructor(
    private _http: HttpClient
  ) {
  }

  public validateOtp(data: OtpRequest): Observable<Response> {
    return this._http.post<Response>(this.urlValidateOtp, data).pipe(map((res) => res));
  }

  public generateOtp(signerId: number): Observable<Response<boolean>> {
    return this._http.post<Response<boolean>>(this.urlGenerateOtp, {"id_signer": signerId}).pipe(map((res) => res));
  }
}
