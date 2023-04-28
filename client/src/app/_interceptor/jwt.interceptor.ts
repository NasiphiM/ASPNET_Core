import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_SERVICES/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accService.currUser$.pipe(take(1)).subscribe({
      next: user =>{
        if (user){
          request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ${user.token}'
            }
          })
        }
      }
    })
    return next.handle(request);
  }
}
