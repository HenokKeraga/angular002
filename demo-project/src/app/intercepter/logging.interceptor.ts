import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(private cookieService:CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const  jwtToken=this.cookieService.get('c-token')

    if(request.headers.get('Anonymous')!==undefined && jwtToken){
      const  clonedReq=request.clone({headers:request.headers.set('Authorization',`Bearer${jwtToken}`)})

      return next.handle(clonedReq)

    }else {
      request.headers.delete('Anonymous')
      return next.handle(request);
    }
  }
}
