import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Member } from '../_models/member';
import { MembersService } from '../_SERVICES/members.service';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailedResolver implements Resolve<Member> {

  constructor(private memService: MembersService ){}
  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    return this.memService.getMember(route.paramMap.get('username')!)
  }
}
