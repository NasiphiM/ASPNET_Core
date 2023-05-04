import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member'
import {map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>;
  constructor(private http: HttpClient) { }

  getMembers(page?:number, itemsPerPage?: number){
    let params = new HttpParams();

    if(page && itemsPerPage){
      params = params.append('pageNum', page);
      params = params.append('pageSize', itemsPerPage)
    }

    return this.http.get<Member[]>(this.baseUrl +'users',{observe: 'response', params}).pipe(
      map(response =>{
        if(response.body){
          this.paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination ){
          this.paginatedResult.pagination = JSON.parse(pagination); //getting serialized data into the object
        }
        return this.paginatedResult;
      })
    )
  }

  getMember(username : string ){
    const mem = this.members.find(
      x=> x.userName === username
    );
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

}
