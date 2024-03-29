import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member'
import {map, of, take } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import {User} from '../_models/user';
import { AccountService } from './account.service';
import {getPaginatedResult, getPaginationHeaders } from './paginationHelper';
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User | undefined;
  userParams: UserParams | undefined;

  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>;
  constructor(private http: HttpClient, private accService: AccountService) {
    this.accService.currUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })
  }

  getUserParams(){
    return this.userParams;
  }

  resetUserParams(){
    if (this.user){
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }
  setUserParams(params: UserParams){
    this.userParams = params;
  }
  getMembers(userParams : UserParams ){
    const res = this.memberCache.get(Object.values(userParams).join('-'));
    let params = getPaginationHeaders(userParams.pageNum, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Member[]>(this.baseUrl + 'users',params,this.http).pipe(
      map(res =>{
        this.memberCache.set(Object.values(userParams).join('-'), res);
        return res;
      }),

    )
  }

  getMember(username : string ){
    const mem = [...this.memberCache.values()] //will display: an array of paginated array
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName == username);

    if (mem) return of(mem);

    return this.http.get<Member>(this.baseUrl +'users/'+ username) ;
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);          //fetches the index of the specific memmber
        this.members[index] = {...this.members[index], ...member}
      })
    );
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {})
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string){
    return this.http.post(this.baseUrl + 'likes/' +username, {});
  }

  getLikes(predicate: string, pageNum: number, pageSize:number ){
    let params = getPaginationHeaders(pageNum, pageSize);
    params = params.append('predicate', predicate)

    return getPaginatedResult<Member[]>(this.baseUrl + 'likes', params, this.http);
  }

}
