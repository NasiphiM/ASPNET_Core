import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_SERVICES/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Dating app';
  users: any;  //turn off ts safety

  constructor( private accService: AccountService){}

  ngOnInit():void{
    this.setCurrentUser();
  }

  /*getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error:() => {},
      complete: ()=> console.log("The task is completed")
    })
  }*/

  setCurrentUser(){
    const userString = localStorage.getItem('user');

    if (!userString) return;

    const usr : User = JSON.parse(userString);
    this.accService.setCurrentUser(usr)
  }
}
