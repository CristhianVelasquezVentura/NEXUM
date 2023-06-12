import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {EnvServiceProvider} from "@app/core/services/env/env.service.provider";

@Injectable({
  providedIn: 'root'
})
export class SignService {

  private urlValidateCode: string = EnvServiceProvider.useFactory().API_DOCUMENT + '/api/v1/signers/validate/';

  constructor(
    private _htt: HttpClient
  ) {
  }

  public validateAccessCode(id_signer: number, access_code: string): Observable<any> {
    return this._htt.get<any>(this.urlValidateCode + `${access_code}/${id_signer}`).pipe(map(res => res));
  }
}
