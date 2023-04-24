import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(public accountService : AccountService,  private router: Router, private toastr: ToastrService  ) {
  }
  ngOnInit() : void {
  }

  login(){
    this.accountService.login(this.model).subscribe(
      {
        next: _=> this.router.navigateByUrl('/members/'),
        error: err => this.toastr.error(err.error)    //err is an object and error is a property of this object
      }
    )
  }

  logout(){
    this.router.navigateByUrl('/');
  }
}
