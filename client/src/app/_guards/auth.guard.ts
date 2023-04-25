import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {map, Observable } from 'rxjs';
import { AccountService } from '../_SERVICES/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private accService: AccountService, private toast: ToastrService){}

  canActivate(): Observable<boolean>  {
    return this.accService.currUser$.pipe(
      map(user => {
        if (user) return true;
        else{
          this.toast.error("You cant pass!");
          return false;
        }
      })
    )
  }

}
