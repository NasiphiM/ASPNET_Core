import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

//responsible for making http requests from client to our server
//Doing it in here allows us to centralise our http requests

export class AccountService {
  baseUrl = environment.apiUrl;
  private currUserSource = new BehaviorSubject<User | null >(null); //current source can either be a User type or null
                                              // (null) - means we're initially seeting it to null
  currUser$ = this.currUserSource.asObservable();
  //injecting http client into constructor
  constructor (private http: HttpClient) {
    let x = localStorage.getItem('user');
    if (x){
      let u = JSON.parse(x) as User;
      this.currUserSource.next(u);
    }
  }

  login(model:any){

    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User)=> {
        const user = response;
        if (user){
          this.setCurrentUser(user);                //if we successfully login we can then update  currUserSource
        }
      })
    )
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user){
          this.setCurrentUser(user);
        }

      })
    )
  }

  setCurrentUser(user: User){
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user');
    this.currUserSource.next(null);
  }

  getDecodedToken(token: string){
    return JSON.parse(atob(token.split('.')[1]))
  }
}
