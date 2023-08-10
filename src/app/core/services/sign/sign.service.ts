import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {EnvServiceProvider} from "@app/core/services/env/env.service.provider";
import {ResponseSigners, ResponseSignersId, Signature, Signer} from "@app/core/models/signer";
import {Response} from "@app/core/models/response";

@Injectable({
  providedIn: 'root'
})
export class SignService {

  private readonly urlValidateCode: string = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/signers/validate/';
  private readonly urlGetSigner: string = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/signers/';
  private readonly urlSignersValidate: string = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/signers/';
  private readonly urlSendSignature: string = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/signature/signer';

  constructor(
    private _http: HttpClient
  ) {
  }

  public validateAccessCode(id_signer: number, access_code: string, document_id: number): Observable<Response> {
    return this._http.get<Response>(this.urlValidateCode + `${access_code}/${id_signer}/${document_id}`).pipe(map(res => res));
  }

  public getSignersById(signerId: number): Observable<Response<Signer>> {
    return this._http.get<Response<Signer>>(this.urlGetSigner + signerId).pipe(map((res) => res));
  }

  public getSignersParams(signerId: number): Observable<Response<Signer>> {
    return this._http.get<Response<Signer>>(this.urlSignersValidate + signerId).pipe(map((res) => res));
  }

  public sendSignature(data: Signature): Observable<Response> {
    return this._http.post<Response>(this.urlSendSignature, data).pipe(map((res) => res));
  }

}
