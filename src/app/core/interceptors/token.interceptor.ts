import {Inject, Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(@Inject(DOCUMENT) private document: any, private authService: AuthService) {
  }

  /**
   * Intercepts each http request to add token, when its source is not external.
   *
   * @param req Http Request
   * @param next
   * @returns Observable
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.params.get('source') !== 'external') {
      // const location = this.document.location;
      req = req.clone({
        // url: location.protocol + '//' + location.host + '/' + req.url,
        headers: this.authService.addTokenHttpHeader()
      });

      return next.handle(req).pipe(catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.handleTokenExpired(err);
          }
          return throwError(err);
        }
      }));
    } else {
      return next.handle(req);
    }
  }

}
