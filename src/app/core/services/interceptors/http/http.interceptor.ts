import {ErrorHandler, inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {Response} from "@app/core/models/global.model";
import {ToastService} from "@app/public/services/toast/toast.service";

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  private _messageService: ToastService = inject(ToastService)
  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('access-token');
    let req = request;

    if (token) {
      req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(catchError((error) => this.mapError(error)))
  }

  mapError(error: HttpErrorResponse){
    const customError: Response<unknown> = {
      error: true,
      type: 'error',
      data: null,
      code: error.status,
      msg: `Ocurrió un error inesperado: ${error.status}, contáctese con el administrador!`
    };

    this._messageService.add({type: 'error', life: 5000, message: customError.msg})

    return throwError(() => customError);
  }
}
