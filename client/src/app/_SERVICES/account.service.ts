import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})

//responsible for making http requests from client to our server
//Doing it in here allows us to centralise our http requests

export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currUserSource = new BehaviorSubject<User | null >(null); //current source can either be a User type or null
                                              // (null) - means we're initially seeting it to null
  currUser$ = this.currUserSource.asObservable();

  //injecting http client into constructor
  constructor (private http: HttpClient) { }

  login(model:any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User)=> {
        const user = response;
        if (user){
          localStorage.setItem('user', JSON.stringify(user)) //user infoormation  in json format
          this.currUserSource.next(user);                   //if we successfully login we can then update  currUserSource
        }
      })
    )
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User){
    this.currUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user');
    this.currUserSource.next(null);
  }
}
