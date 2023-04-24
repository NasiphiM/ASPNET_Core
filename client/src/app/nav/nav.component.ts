import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_SERVICES/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  model:any ={}
  //loggedIn = false;
  //currUser$ : Observable<User | null> = of(null); //this is initialisation of Obsevable currUser$ to null value
  constructor(public accountService : AccountService ) {
  }
  ngOnInit() : void {
    //this.currUser$ = this.accountService.currUser$;
  }

  //temp method to check if user is logged in
  // getCurrUser(){
  //   this.accountService.currUser$.subscribe({                //subscribe because it is an observable
  //     next: user => this.loggedIn = !!user,
  //     error : err => console.log(err)
  //   })
  // }
  login(){
    this.accountService.login(this.model).subscribe(
      {
        next: response => {
          console.log(response);
          //this.loggedIn = true;
        },
        error: error =>  console.log(error)
      }
    )
  }

  logout(){
    this.accountService.logout(); //removes item fromlocalStorage
    //this.loggedIn = false;
  }
}
