import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {map, Observable } from 'rxjs';
import { AccountService } from '../_SERVICES/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accService: AccountService, private toastr: ToastrService) {
  }
  canActivate(): Observable<boolean> {
    return this.accService.currUser$.pipe(
      map(user =>{
        if (!user) return false;
        if (user.roles.includes('Admin') || user.roles.includes('Moderator')){
          return true;
        }else{
          this.toastr.error('You cannot enter this area');
          return false;
        }
      })
    )

  }

}
